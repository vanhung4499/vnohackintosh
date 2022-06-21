---
title: OpenCore cơ bản
---


## Cấu trúc OpenCore

Link repos OpenCore: https://github.com/acidanthera/OpenCorePkg

Link tải xuống các phiên bản: https://github.com/acidanthera/OpenCorePkg/releases

Sau khi tải và giải nén file OpenCore ta được như sau:

![oc-struct](/img/docs/usb-creation/oc-struct.png)

Các chức năng của các thư mục này được mô tả ngắn gọn bên dưới:

+ **Docs** : Lưu trữ tài liệu cấu hình OC mới nhất, thay đổi cập nhật phiên bản, các file SSDT mẫu và file config mẫu **Sample.list**
+ **IA32** : Chứa các EFI sử dụng cho máy cũ 32 bit (không cần quan tâm)
+ **Utilities** : Các tool tích hợp sẵb của OC (không cần dùng)
+ **X64** : Chứa EFI sử dụng cho máy 64 bit, nói chung là PC Laptop hiện tại sẽ dùng (quan trọng nhất)

## Docs

```bash title="~/Downloads/OpenCore-0.7.9-RELEASE/Docs"
tree
.
├── AcpiSamples          # ACPI mẫu
│   ├── Binaries         # ACPI đã biên dịch
│   │   ├── SSDT-ALS0.aml
│   │   ├── SSDT-AWAC-DISABLE.aml
│   │   ...
│   └── Source           # ACPI nguồn, chưa biên dịch
│       ├── SSDT-ALS0.dsl
│       ├── SSDT-AWAC-DISABLE.dsl
│     	...
├── Changelog.md         # Tổng hợp các thay đổi qua nhiều bản
├── Configuration.pdf    # Tài liệu cấu hình của phiên bản hiện tại
├── Differences.pdf      # Thay đổi so với bản cũ gần nhất
├── Sample.plist         # Config mẫu cơ bản (quan trọng)
└── SampleCustom.plist   # Cũng là config mẫu nhưng có một số sửa đổi
```

Các file trong Docs tương đối dễ hiểu, ngoại trừ việc dường như có hai config mẫu, Sample.plist và SampleCustom.plist, tôi đã so sánh chúng và thấy rằng về cơ bản không có sự khác biệt giữa hai config, chứa đầy đủ các key/value cần thiết. Tôi thường chỉ dùng **Sample.plist**, file này sẽ phải đổi tên thành **Config.plist** thì mới có tác dụng.

## Utilities

Có rất nhiều tool ở đây nhưng thực tế tôi không hề động vào chúng, cá nhân tôi thấy không cần thiết phải liệt kê hết chúng, bạn chỉ cần biết một vài tool có thể hữu ích sau:

- **icnspack** ：tạo các icon icns dùng trong theme OC, nếu bạn muốn tự tạo theme thì chắc bạn sẽ cần tới nó 
- **macrecovery** ：tải xuống recovery macOS, dùng khi tạo bộ cài Online
- **ocvalidate** : Kiểm tra config.list có tương thích với phiên bản không, hiển thi các lỗi để chỉnh sửa

## EFI

Cuối cùng, chúng ta đến với phần quan trọng nhất là EFI. Cấu trúc EFI cũng rất rõ ràng, nhìn vào tên thư mục con là bạn cũng biết được ý nghĩa của thư mục đó. Sau đây là giải thích về vai trò của thư mục trong EFI chính:

:::info
Bạn hãy chép thư mục EFI này ra một nơi khác để tiện thao tác, vì tất cả chúng ta cần làm đang là chỉnh sửa EFI cho phù hợp với cấu hình. Cụ thể là thêm ACPI, thêm Kext, thêm config, chuyển chúng đến đúng vị trí, loại bỏ đi những thành phần không cần thiết để tạo một EFI clean nhất có thể!
:::

```bash title="~/Downloads/OpenCore-0.7.9-RELEASE/X64/EFI"
tree
.
├── BOOT                          # Thư mục Boostrap
│   └── BOOTx64.efi               # File khởi động
└── OC                            # OC 
    ├── ACPI			          # ACPI 
    │   ├── SSDT-EC.aml
    │   ├── SSDT-PLUG.aml
    │   │── SSDT-PNLF.aml
    │       ...
    ├── Drivers                   # OC Driver
    │   ├── AudioDxe.efi
    │   ├── CrScreenshotDxe.efi
    │   ├── HiiDatabase.efi
    │       ...
    ├── Kexts                     # Thư mục kexts 
    │   ├── AppleALC.kext
    │   ├── Lilu.kext
    │   ├── WhateverGreen.kext
    │       ...
    ├── OpenCore.efi              # OC core
    ├── Resources                 # OC Theme
    │   ├── Audio
    │   ├── Font
    │   ├── Image
    │   └── Label
    └── Tools                     # OC Tools
        ├── BootKicker.efi
        ├── ChipTune.efi
        ├── CleanNvram.efi
            ...
```

### BOOT
Thư mục khởi động BOOT, trong đó là file bootstrap BOOTx64.efi

:::info
Đối với hệ thống UEFI, khi mà bạn bật máy tính lên, bạn vào boot manager, chọn 1 option trong đó thì tức là đang chạy file **BOOTX64.EFI** nằm đúng theo đường dẫn **EFI\BOOT\BOOTX64.EFI**
:::

### OC/ACPI

Chứa các file SSDT phù hợp, ở định dạng .aml. Hướng dẫn chi tiết về SSDT, vui lòng chuyển đến [bài viết sau](/docs/usb-creation/basic-acpi). Các bạn cần chọn các SSDT phù hợp với cấu hình máy và cho chúng vào đây.

### OC/Drivers

Có rất nhiều file driver ở đây, đuôi .efi, nhưng thật sự không cần phải biết tất cả, chỉ cần hai driver sau là đủ:

+ **OpenHfsPlus.efi** : Driver hỗ trợ OC xử lý định dạng HFS+, nếu không có nó OC sẽ không nhận ra phân vùng cài đặt macOS từ USB
+ **OpenRuntime.efi** : Driver core của OC với các chức năng mạnh mẽ, chỉ cần biết rằng đây là driver bắt buộc phải có phải có
+ **HfsPlus.efi** : Tương tự như OpenHfsPlus.efi nhưng không được cung cấp mặc định trong OC, tải xuống từ [OcBinaryData](https://github.com/acidanthera/OcBinaryData), nằm trong thư mục Drivers của repos, tôi hay dùng driver này thay cho OpenHfsPlus.efi, lưu ý **chỉ dùng 1 trong 2**



:::info
Ngoài ra một số driver sau bạn cũng nên biết để làm màu cho màn hình khởi động OC:
+ **AudioDxe.efi** : Phát âm thanh của OpenCore khi nó khởi động (làm màu, không quan trọng)
+ **CrScreenshotDxe.efi** : Chụp ảnh chụp màn hình khởi động OC, nhấn F10 sẽ lưu ảnh chụp màn hình vào thư mục gốc của phân vùng EFI
+ **OpenCanopy.efi** : Trình điều khiển cần thiết để sử dụng các chủ đề OC đồ họa
:::

### OC/Kexts

Chứa các Kexts ở định dạng tệp .kext. Hướng dẫn cơ bản về các Kext, vui lòng chuyển đến [bài viết sau](/docs/usb-creation/basic-kext). Các bạn cần chọn các kext phù hợp với cấu hình máy và cho chúng vào đây.

### Resources

Mặc định thư mục này rỗng, bạn có thể tải xuống các bộ theme khác nhau, và cho vào đây.

Bộ theme cơ sở, bạn có thể tải xuống từ [OcBinaryData](https://github.com/acidanthera/OcBinaryData), chép đè thư mục Resources trong repos trên. Từ bản theme cơ sở này bạn có thể chỉnh sửa theo ý muốn, thay icon, thay nền ... và tạo thành theme mới.

![oc-theme](/img/docs/usb-creation/oc-theme.png)

### Tools

Trong thư mục này có sẵn khá nhiều tool nhưng cũng rất ít khi bạn động tới chúng, bạn không cần quan tâm tới chúng.

![oc-tools](/img/docs/usb-creation/oc-tools.png)

