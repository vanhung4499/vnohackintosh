---
title: Chuẩn bị file cần thiết
---

:::info

+ Bài viết này bao gồm danh sách file để hackintosh mà bạn sẽ cần chuẩn bị.
+ Bạn cần phải hiểu công dụng của chúng!
+ Tuỳ thuộc vào cấu hình máy của bạn mà chọn file chứ không phải tải tất cả.
:::

## Installers

+ [Monterey](/)
+ [Big Sur](/)
+ [Catalina](/)
+ [Mojave](/)
+ [High Siera](/)

:::note
Hướng dẫn này không hỗ trợ các bản macOS 10.12 trở về trước do đã quá cũ!
:::

## Bootloaders

+ [OpenCore](https://github.com/acidanthera/OpenCorePkg/releases)
+ [Clover](https://github.com/CloverHackyColor/CloverBootloader/releases)

## Firmware Drivers

+ Firmware driver là driver sử dụng cho bootloader (không phải driver cho OS).
+ Chúng cần phải có để phục vụ cho các chức năng của bootloader ví dụ như HFSPlus.efi để bootloader có thể đọc được phân vùng định dạng HFS.
+ Những driver chính đã có sẵn trong file bootloader ở trên, vị trí của chúng:
  + OC: **EFI/OC/Drivers/**
    + Clover: **EFI/Clover/Drivers/Off**

### Universal

Đối với tất cả hệ thống, bắt buộc cần phải có một số `.efi` drivers:

| Driver               | OC                                                                                            | Clover                                | Công dụng                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| HfsPlus.efi          | [OcBinaryData](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi) |[OcBinaryData](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi)| Hỗ trợ định dạng HFS, nếu không có bạn sẽ không thấy phân vùng cài đặt từ usb |
| ApfsDriverLoader.efi | Tích hợp sẵn                                                                                  | EFI/Clover/Drivers/Off/UEFI/MemoryFix | Hỗ trợ định dạng APFS, nếu không có bạn sẽ không thấy phân vùng macOS         |
| OpenRuntime.efi      | EFI/Drivers/                                                                                  | EFI/Clover/Drivers/Off/UEFI/MemoryFix | Patch boot.efi sửa lỗi NVRAM và quản lý bộ nhớ                             |

## Kexts

Kext là viết tắt của **K**ernel **ext**ension, bạn có thể hiểu nó tương tự như driver trong Windows.

### Bắt buộc phải có

+ [VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)
  + Giả lập chip SMC trên realmac, không có nó thì không boot được macOS

+ [Lilu](https://github.com/acidanthera/Lilu/releases)
  + Kext dùng để patch nhiều tiến trình, yêu cầu cho AppleALC, WhateverGreen, VirtualSMC và rất nhiều kext khác, nếu không có Lilu, chúng sẽ không chạy.
  + Ngày xưa khi chưa có Lilu, gần như mọi việc bạn sẽ cần làm thủ công, Lilu cho phép chỉnh sửa các kext và hệ thống macOS khi boot, ví dụ lúc trước nếu bạn patch AppleHDA, bạn sẽ phải chỉnh sửa và thay thế AppleHDA.kext trong hệ thống, còn bây giờ, AppleALC thông qua lilu sẽ chỉnh sửa AppleHDA.kext lúc boot.

### VirtualSMC Plugins

Những plugins này không cần thiết để boot, nhưng nó có số tác trong trường hợp cụ thể (nên biết):

+ SMCProcessor.kext
  + Dùng để đọc thông tin nhiệt độ CPU, **không hoạt động với CPU AMD**
+ SMCSuperIO.kext
  + Dùng để đọc thông tin fan speed, **không hoạt động với CPU AMD**
+ SMCLightSensor.kext
  + Dùng cho cảm biết ánh sáng trên laptop, **pc thì bỏ qua**
  + Không dùng nếu máy không có cảm biến hay không có chức năng tự điều chỉnh độ sáng theo ánh sáng xung quanh
+ SMCBatteryManager.kext
  + Dùng để đọc thông pin phần trăm pin trên laptop, **pc thì bỏ qua**
+ SMCDellSensors.kext
  + Cho phép theo dõi và điều chỉnh tốc độ fan trên máy Dell hỗ trợ System Management Mode(SMM)
  + **Không phải máy Dell thì bỏ qua**, rất nhiều laptop Dell có thể dùng kext để chỉnh quạt

### Graphics

+ [WhateverGreen](https://github.com/acidanthera/WhateverGreen/releases)
  + Dùng cho graphics patching, DRM fix, board ID check, framebuffer fix, ... tất cả GPU cần kext này

### Audio

+ [AppleALC](https://github.com/acidanthera/AppleALC/releases)
  + Dùng để patch AppleHDA, giúp audio hoạt động trong macOS

### Ethernet

Tuỳ vào cấu hình máy bạn, chọn kext phù hợp với Ethernet card trong máy

+ [IntelMausi](https://github.com/acidanthera/IntelMausi/releases)
  + Dùng cho Intel NICs
  + Hỗ trợ Intel's 82578, 82579, I217, I218 and I219 NICs
+ [SmallTreeIntel82576 kext](https://github.com/khronokernel/SmallTree-I211-AT-patch/releases)
  + Dùng cho Intel I211 NICs
+ [AtherosE2200Ethernet](https://github.com/Mieze/AtherosE2200Ethernet/releases)
  + Dùng cho Atheros và Killer NICs
  + Killer E2600 chưa được hỗ trợ
+ [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
  + Dành cho Realtek Gigabit Ethernet
  + macOS 10.13 dùng bản 2.2.2 tới v2.3.0, macOS 10.14 trở đi dùng bản 2.4.0 hoặc cao hơn
  + Nếu bạn dùng bản kext cao mà lỗi thì thử bản cũ hơn
+ [LucyRTL8125Ethernet](https://www.insanelymac.com/forum/files/file/1004-lucyrtl8125ethernet/)
  + Cho Realtek 2.5Gb Ethernet
+ Đối với Intel I225-V NICs, cần phải patch device properties, sẽ đề cập sau
+ Một số NICs native trong macOS, thường rất ít khi gặp nên tôi không đề cập

### USB

+ [USBInjectAll](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/)
  + Kext dùng cho Intel USB hoạt động mà không cần patch acpi
  + Không hoạt động với AMD CPU

+ [XHCI-unsupported](https://github.com/RehabMan/OS-X-USB-Inject-All)
  + Cần cho non-native USB controllers
  + PC AMD CPU không cần
  + Mainboard chipsets cần phải có kext này: X79, X99, H410, B460

+ [USBToolBox](https://github.com/USBToolBox/kext)
  + Kext và tool mới, dùng trên windows giúp map usb nhanh và dễ sử dụng

### WiFi and Bluetooth

#### Intel

+ [AirportItlwm](https://github.com/OpenIntelWireless/itlwm/releases)
  + Hỗ trợ rất nhiều card wifi intel trước kia thì chỉ có thể thay card
+ [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases)
  + Hỗ trợ Bluetooth hoạt động trong macOS nhưng vẫn còn nhiều hạn chế

#### Broadcom

+ [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
  + Dùng để patch non-Apple/non-Fenvi Broadcom card như dòng BCM94352
+ [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM/releases)
  + Dùng để sửa lỗi firmware trên Broadcom Bluetooth, Dùng cho tất cả non-Apple/non-Fenvi Airport card.

### Extras

+ [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  + Chặn AppleMCEReporter kext gây panic trên hệ thống AMD CPU
  + Tác dụng với SMBIOS: MacPro6,1 MacPro7,1 iMacPro1,1

+ [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases)
  + Cần để đồng bộ TSC trên một số máy HEDT và main server, nếu thiếu thì máy có thể chạy chậm, giật lag
  + Một số laptop Dell và ASUS cũng cần kext này
+ [NVMeFix](https://github.com/acidanthera/NVMeFix/releases)
  + Sửa lỗi power management cho non-Apple NVMe
+ [CtlnaAHCIPort](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip)
  + Hỗ trợ một số SATA controller trên macOS Big Sur trở đi, do những controller đã bị apple bỏ đi, không native nữa
  + Nếu gặp trường hợp không nhận ổ cứng SATA thì phải thêm kext này

### Laptop Input

Dựa vào phần cứng trackpad có trên máy mà chọn kext phù hợp, kext cho bàn phím và trackpad

:::info
Đa số bàn phím laptop là PS2! Một số laptop ASUS, MSI dùng bàn phím USB!
:::

#### PS2 Keyboards/Trackpads

+ [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases)
  + Hoạt động với PS2 keyboard, mice, và trackpad
+ [RehabMan's VoodooPS2](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/)
  + Dành cho những máy đã cũ xài PS2 keyboard, mice, and trackpad, thường là intel gen 2/3

#### SMBus Trackpads

+ [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/)
  + Dành cho máy dùng Synaptics SMBus trackpad
  + Các máy Thinkpad và một số máy HP sẽ cần kext này
+ [VoodooSMBus](https://github.com/VoodooSMBus/VoodooSMBus/releases)
  + Dành cho máy dùng ELAN SMBus Trackpad
  + Cụ thể là cho máy T480, T480, L380

#### I2C/USB HID Devices

+ [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C/releases)
  + Bao gồm VoodooI2C và các plugin dành cho các loại I2C trackpad/touch khác nhau
  + Cụ thể về các plugin xem bảng dưới

:::info VoodooI2C Plugins

| Kiểu kết nối              | Plugin                                                          | Công dụng                                                                       |
| :------------------------ | :-------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| Multitouch HID            | VoodooI2CHID                                                    | Dùng cho đa số I2C/USB Touchscreen và Trackpad                                  |
| ELAN Proprietary          | VoodooI2CElan                                                   | Thường là dùng cho ELAN1000 trên một số laptop ASUS gen 6                       |
| FTE1001 touchpad          | VoodooI2CFTE                                                    | Chưa thấy máy nào dùng                                                          |
| Atmel Multitouch Protocol | VoodooI2CAtmelMXT                                               | Chưa thấy máy nào dùng                                                          |
| Synaptics HID             | [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/) | Dành chp I2C Synaptic Trackpads (chỉ cần VoodooI2C), trên một số laptop HP      |
| Alps HID                  | [AlpsHID](https://github.com/blankmac/AlpsHID/releases)         | Dùng cho USB hoặc I2C Alps trackpad, trên một số laptop Dell Latitude, HP gen 7 |

:::

### Laptop Misc

+ [ECEnabler](https://github.com/1Revenger1/ECEnabler/releases)
  + Sửa lỗi hiển thị phần trăm pin trên laptop mà không cần patch acpi
+ [BrightnessKeys](https://github.com/acidanthera/BrightnessKeys/releases)
  + Sửa lỗi phím tăng giảm độ sáng không hoạt động

:::info
Nếu bạn muốn tìm hiểu thêm về kext vui lòng xem danh sách [Kexts.md](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Kexts.md) này
:::

## Configs

Config.plist là file cấu hình tất cả các chức năng của Bootloader (OC và Clover). Chỉnh sửa một file config là phần rất quan trọng và phức tạp nên tôi sẽ viết thành một phần riêng. Vui lòng đọc các phần sau!
