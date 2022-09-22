---
title: UEFI
---

:::info
Phần này khá dài với nhiều chức năng nhưng không cần phải quan tâm tất cả, chỉ cần lưu ý vào điều.
:::

## APFS

Phần này cấu hình cho APFS driver, nếu để trống OpenCore sẽ không quét được các phân dùng định dạng APFS. Để nguyên theo mặc định là được:

![occ-uefi-apfs.png](/img/docs/opencore-config/occ-uefi-apfs.png)

Lưu ý để cài đặt macOS High Sierra (10.13) -> Catalina (10.15), bạn phải đặt `MinDate` và `MinVersion` thành `-1`.

## AppleInput

Không cần chỉnh sửa giữ nguyên là được:

![occ-uefi-ai.png](/img/docs/opencore-config/occ-uefi-ai.png)

## Audio

Phần này cấu hình cho âm thanh lúc khởi động OC, giữ nguyên mặc định (tôi không dùng chức năng này):

![occ-uefi-audio.png](/img/docs/opencore-config/occ-uefi-audio.png)

## Drivers

Phần này quan trọng, danh sách quyết định những driver nào sẽ được dùng. Mặc định sẽ có khá nhiều driver không cần thiết, hãy xoá hết, chỉ giữ lại, nhớ tích Enable:

![occ-uefi-driver.png](/img/docs/opencore-config/occ-uefi-driver.png)

Đương nhiên là bạn phải có cái driver tương ứng trong **EFI/Drivers**!

## Input

Không cần chỉnh sửa giữ nguyên là được:

![occ-uefi-input.png](/img/docs/opencore-config/occ-uefi-input.png)

## Output

Không cần chỉnh sửa giữ nguyên là được:

![occ-uefi-output.png](/img/docs/opencore-config/occ-uefi-output.png)

## ProtocolOverrides

Không cần chỉnh sửa giữ nguyên là được:

![occ-uefi-pc.png](/img/docs/opencore-config/occ-uefi-pc.png)

## ReservedMemory

Không cần chỉnh sửa giữ nguyên là được:

![occ-uefi-rm.png](/img/docs/opencore-config/occ-uefi-rm.png)

## Quirks

![occ-uefi-quirk.png](/img/docs/opencore-config/occ-uefi-quirk.png)

Giải thích sơ qua về chức năng của các quirk. Một số cấu hình thì cần sửa đổi, nhưng thực tế thì chỉ cần để như mặc định là ổn.

- ActivateHpetSupport
  - Mainboard cũ chip set ICH6 không có HPET, quirk này cố gắng bật nó lên
- **EnableVectorAcceleration**
  - Khi CPU hỗ trợ AVX-512 hoặc AVX, hãy bật quirk này kích hoạt tính năng AVX vector acceleration giúp tính toán hash SHA-512 and SHA-384 nhanh hơn
- EnableVmx
  - Kích hoạt Intel virtual machine extension, tức là cho phép chạy máy ảo trên trên một số hệ thống không cho chỉnh VMX trong BIOS, nếu có thì bỏ qua.
- DisableSecurityPolicy
  - Tắt Khởi động an toàn trên của mainboad UEFI
- ExitBootServicesDelay
  - Mainboard cũ cần cung thấp thời gian thoát  (tính bằng ms) sau sự kiện `EXIT_BOOT_SERVICES`
  - Mặc địnhđặt bằng `0`
  - Mainboard đời cũ như `ASUS Z87 Pro`  đặt thành `3000000-5000000` (3-5s)
- ForceOcWriteFlash
  - Cho phép ghi vào bộ nhớ flash cho tất cả các biến hệ thống được OpenCore quản lý
- **IgnoreInvalidFlexRatio**
  - Vô hiệu hoá `MSR_FLEX_RATIO` (0x194) MSR Rigister gây lỗi trong quá trình boot mac
  - Tất cả các máy từ Broadwell trở về trước sẽ bắt buộc bật quirk này
- ReleaseUsbOwnership
  - Cố gắng tách quyền điều khiển USB ra khỏi firmware
  - Hầu hết mainboad đều có chức năng giải phóng quyền điều khiển USB, nên không cần quirk này
  - Nếu bàn phím và chuột khởi động bị kẹt hoặc USB bị lỗi, bạn có thể cân nhắc bật nó
- ReloadOptionRoms
  - Yêu cầu các PCI device reload Option Rom khi có thể
- **RequestBootVarRouting**
  - Chuyển hướng AptioMemoryFix từ `EFI_GLOBAL_VARIABLE_GUID` qua `OC_VENDOR_VARIABLE_GUID`
  - Cần thiết cho quá trình khởi động của tất cả hệ thống
- **UnblockFsConnect**
  - Máy HP có thể ngăn OC quét các vùng khởi động, yêu cầu bật cho tất cả máy HP
- TscSyncTimeout
  - Giúp một số mainboad X99, X299 thực hiện chức năng đồng bộ TSC sau một khoảng thời gian chờ, nhưng không tốt bằng một số Kexts chuyên nghiệp nên không dùng
- ResizeGpuBars
  - Cấu hình kích cỡ `GPU PCI BAR`

Sau đây là cách chọn quirk theo cấu hình:

### Intel Desktop - Sandy Bridge, Ivy Bridge, Haswell, Broadwell

![xc-uefi-q-dt-5.png](/img/docs/opencore-config/xc-uefi-q-dt-5.png)

![occ-uefi-q-dt-5.png](/img/docs/opencore-config/occ-uefi-q-dt-5.png)

### Intel Desktop - Skylake, Kaby Lake, Coffee Lake, Comet Lake, Tiger Lake, Alder Lake

![xc-uefi-q-dt-6.png](/img/docs/opencore-config/xc-uefi-q-dt-6.png)

![occ-uefi-q-dt-6.png](/img/docs/opencore-config/occ-uefi-q-dt-6.png)

### Intel HEDT - Sandy Bridge-E, Ivy Bridge-E, Haswell-E, Broadwell-E

![xc-uefi-q-dt-5.png](/img/docs/opencore-config/xc-uefi-q-dt-5.png)

![occ-uefi-q-dt-5.png](/img/docs/opencore-config/occ-uefi-q-dt-5.png)

### Intel HEDT - Skylake-X/W, Cascade Lake-X/W

![xc-uefi-q-dt-6.png](/img/docs/opencore-config/xc-uefi-q-dt-6.png)

![occ-uefi-q-dt-6.png](/img/docs/opencore-config/occ-uefi-q-dt-6.png)

### Intel Laptop - Sandy Bridge, Ivy Bridge, Haswell, Broadwell

![xc-uefi-q-lt-5.png](/img/docs/opencore-config/xc-uefi-q-lt-5.png)

![occ-uefi-q-lt-5.png](/img/docs/opencore-config/occ-uefi-q-lt-5.png)

### Intel Laptop - Skylake, Kaby Lake, Coffee Lake, Whiskey Lake, Coffee Lake Plus, Comet Lake, Icelake

![xc-uefi-q-lt-6.png](/img/docs/opencore-config/xc-uefi-q-lt-6.png)

![occ-uefi-q-lt-6.png](/img/docs/opencore-config/occ-uefi-q-lt-6.png)

### AMD Desktop

![xc-uefi-q-amd.png](/img/docs/opencore-config/xc-uefi-q-amd.png)

![occ-uefi-q-dt-6.png](/img/docs/opencore-config/occ-uefi-q-dt-6.png)
