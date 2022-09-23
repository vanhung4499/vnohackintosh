---
title: Tối ưu Power Management
---

:::info
Để hệ thống hoạt động ổn định với hiệu năng cân bằng, chức năng CPU Power Management là rất quan trọng. Hiểu một cách đơn giản là nó liên quan tới việc CPU hoạt động thế nào? CPU chạy chậm hoặc chạy mạnh quá khiến máy quá nóng, nhanh hết pin (đối với laptop) và còn liên quan tới sleep/wake, ...
:::

:::info
Power Management là một chức năng quan trọng của hệ điều hành! Việc dịch ra tiếng việt là quản lý điện năng nghe khá là không hợp nên tôi giữ nguyên tiếng anh!
:::

## Một ít lý thuyết

### XCPM và macOS

OS X Mountain Lion 10.8.5 ra đời đi kèm với việc đưa CPU Intel Haswell vào real mac. Cùng thời điểm đó, Apple chuyển CPU Power Management từ `AppleIntelCPUPowerManagement.kext` qua Kernel cho CPU Haswell và sau đó là các CPU mới hơn. Công nghệ này gọi là **XCPM (Xnu CPU Power Management)**. Hiểu đơn giản là macOS tự quản lý power, và tính năng này chỉ hỗ trợ CPU Haswell trở lên.

### CFG-Lock (MSR 0xE2 register)

Tôi đề cập `CFG-Lock` trong phần config và bios, sau đây là lý do tại sao phải tắt nó đi:

Trong các máy real mac, Apple không khoá `MSR 0xE2 register` (tức cho phép ghi vào register này). Còn trong các mainboard cho CPU Intel thì có thể mặc định bị khoá (không tìm thấy `CFG-LOCK` trong bios nghĩa là mặc định khoá), đa số laptop đều bị khoá. Khi macOS Kernel cố ghi vào register này nhưng nó bị khoá mất rồi thì sẽ gây **Kernel Panic**. Giải pháp khi không tắt được `CFG-LOCK` là patch `AppleIntelCPUPowerManagement.kext` lẫn Kernel để tránh ghi vào `MSR 0xE2 register`.

May mắn là CLOVER và OPENCORE đều hỗ trợ patch tự động vấn đề này. Đối với OC thì đó là `AppleXcpmCfgLock` trong `Config > Kernel > Quirks`. Do đó nếu máy bạn tắt được `CFG-LOCK` trong bios thì hãy bỏ quirk này đi!

:::danger
Còn một cách nữa đó là mod bios để tắt `CFG-LOCK`, cách này không phù hợp cho người mới hoặc ít kinh nghiệm xử lý vì nếu làm sai bạn sẽ phải mang máy đi nạp lại bios. Hoặc tệ hơn là sửa thêm những thứ khác. Nói chung là tốn tiền!
:::

### Power Management và SMBIOS

Như tôi đã nói trên, XCPM là tính năng tự quản lý power từ kernel của macOS. Máy real mac cũng sẽ có tính năng trên. Với các máy khác nhau thì cũng phải có cơ chế Power Management khác nhau, VD CPU Macbook thì hoạt động không mạnh bằng iMac và MacPro!

Việc chọn SMBIOS sẽ ảnh hưởng tới Power Management và hiệu năng CPU. Do đó việc chọn SMBIOS cần chọn sao cho gần giống với CPU của máy bạn nhất!

## Kích hoạt Power Management

:::info
Máy Sandy Bridge, power management gốc được kích hoạt bởi `ACPI_SMC_PlatformPlugin.kext` một plugin trong `IOPlatformPluginFamily.kext`. Còn từ Ivy Bridge trở đi, power management gốc được kích hoạt bởi `X86PlatformPlugin.kext`.
:::

:::danger
Trong [guide dortania power management](https://dortania.github.io/OpenCore-Post-Install/universal/pm.html) có đề cập tới việc tự điều chỉnh dữ liệu Power Management nhưng cá nhân tôi không khuyến khích điều này! Việc này có thể gây ra những lỗi không đáng có, hãy để macOS chạy như mặc định, chỉ nên đổi SMBIOS khác để thử. Tôi sẽ không đề cập phần này!
:::

### Haswell trở về sau

Kể từ Haswell trở đi thì XCPM được hỗ trợ. Chỉ cần đơn giản là thêm `SSDT-PLUG` để kích hoạt `X86PlatformPlugin.kext`. Việc này đã thực hiện từ trước nên giờ bạn chả cần phải làm gì thêm nữa!

:::info
+ Đối với Alder Lake (12th) dùng `SSDT-PLUG-ALT` thay cho `SSDT-PLUG`. Nó cũng nằm trong `OpenCore-0.X.X-RELEASE/Docs/AcpiSamples/Binaries`.
+ XCPM không hỗ trợ trực tiếp Haswell-E và Broadwell-E, cần phải fake CPU ID (tôi đã đề cập trong phần config) về một mẫu CPU được hỗ trơ. Ngoài ra còn phải thêm một số Kernel Patch nhưng may mắn thay thời điểm hiện tại OpenCore đã xử lý vấn đề này, bạn không cần phải thêm kernel patch nào cả máy vẫn hoạt động ổn. Tôi đã test trên khá nhiều hệ thống X99 + Haswell-E/Broadwell-E.
:::

:::tip
Kể từ macOS 12.3 trở lên, không cần phải dùng `SSDT-PLUG` nữa! Alder Lake vẫn cần!
:::

### Intel Ivy Bridge trở về trước

#### Drop CpuPm và Cpu0Ist

Ban đầu cài, trong config tôi mặc định để xoá 2 bảng ACPI này đi để tránh lỗi trong quá tình cài. Cần tạo `SSDT-PM` và thêm vào EFI rồi mới bỏ việc drop 2 bảng ACPI này.

#### Tạo SSDT cho Power Management

Sử dụng tool [ssdtPRGen](https://github.com/Piker-Alpha/ssdtPRGen.sh) để tạo SSDT cho Power Management:

Thực hiện chạy lần lượt các lệnh sau trong **Terminal**:

1. Tải xuống

   ```bash
   curl -o ~/ssdtPRGen.sh https://raw.githubusercontent.com/Piker-Alpha/ssdtPRGen.sh/Beta/ssdtPRGen.sh
   ```

2. Cấp quyền excecutable

   ```bash
   chmod +x ~/ssdtPRGen.sh
   ```

3. Run

   ```bash
   sudo ~/ssdtPRGen.sh
   ```

4. Sau khi chạy xong, file `ssdt.aml` sẽ được tạo nằm trong `/Users/<your-name>/Library/ssdtPRGen/`. Để đơn giản hơn, copy nó ra `Desktop` và đổi tên thành `SSDT-PM.aml` bằng lệnh sau:

    ```bash
    cp ~/Library/ssdtPRGen/ssdt.aml ~/Desktop/SSDT-PM.aml
    ```

![](/img/docs/post-install/ssdtprgen.png)


#### Thêm SSDT-PM

Hãy thêm `SSDT-PM.aml` vào EFI của bạn (cách thêm như thế nào tôi không cần phải nhắc lại nữa). Đồng thời bỏ tích **Drop CpuPm và Cpu0Ist** trong `Config>ACPI>Delete`

:::danger
Một vài trường hợp sau khi tôi không drop CpuPm và Cpu0Ist thì máy sẽ boot vào macOS được nên nếu gặp tình trạng trên, hãy dùng USB boot lại vào macOS và tích chúng trở lại!
:::

### AMD CPU Power Management

macOS không hỗ trợ AMD CPU Power Management, việc có thể boot vào macOS cũng đã phải chỉnh sửa kernel khá nhiều! Cộng đồng AMD OSX đã nỗ lực để hỗ trợ tính năng này thông qua việc viết [SMCAMDProcessor](https://github.com/trulyspinach/SMCAMDProcessor).

Bạn sẽ thêm `AMDRyzenCPUPowerManagement.kext` cho Power Management và `SMCAMDProcessor.kext` cho các sensor! Đi kèm với đó là app `AMD Power Gadget`

![](/img/docs/post-install/amd-power-gadget.png)

:::danger
Không nên tự ý điều chỉnh PState hay FanControl như trong repo, điều này có thể gây lỗi!
:::

:::info
Hiện tại kext này vẫn chưa hoàn toàn là ổn định, cân nhắc trước khi dùng. Nếu gặp các lỗi kernel panic hoặc lỗi khi boot macOS thì hãy thử bỏ nó đi. Cá nhân tôi dùng rất nhiều lần và chưa gặp lỗi gì khi dùng nó cả!
:::

## Kiểm tra CPU Power Management

Sử dụng app `IORegistryExplorer` tìm đến phần CPU (trong phần search gõ `plugin-type`) và xem `X86PlatformPlugin` hoặc `ACPI_SMC_PlatformPlugin` (Sandy Bridge) đã được tải chưa. 

|                 Hoạt động                  |                Không hoạt động                 |
| :----------------------------------------: | :--------------------------------------------: |
| ![](/img/docs/post-install/pm-working.png) | ![](/img/docs/post-install/pm-not-working.png) |

Chỉ cần kext trên chạy tức là Power Management đã được kích hoạt!

:::danger
+ Nhiều hướng dẫn cũ sẽ hướng dẫn bạn test CPU Speedstep thông qua kext `AppleIntelInfo`, điều này là không cần thiết! Từ Big Sur trở đi việc load kext sẽ không đơn giản như trước nên hãy bỏ qua!
+ Không nên cài đặt `Intel Power Gadget` vì đã rất lâu rồi không có cập nhật gì, tôi đã gặp khá nhiều trường hợp lỗi sleep/wake bởi vì kext cài thêm từ app này! Hãy cân nhắc trước khi dùng!
:::