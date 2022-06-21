---
title: Chuẩn bị kext cơ bản
---

## Khái niệm cơ bản

Kext viết tắt của là **K**ernel **Ext**ension là phần mở rộng của kernel, chúng ta có thể hiểu một cách đơn giản đây là driver của macOS. Với OC, để sử dụng bạn cần cho các file kext này vào thư mục **EFI/OC/Kexts** rồi chỉnh sửa config OC, còn với Clover thì cần cho vào thư mục **EFI/Clover/kexts/Other**.

## Tải xuống Kext

Sau đây là một số cách tải xuống các kext:

1. Truy cập link github của kext, chọn vào link **releases** và tải xuống phiên bản mới nhất
2. Dùng các phần mềm chỉnh sửa config như OpenCore Configurator, Clover Configurator, OC Auxiliary Tools
3. Sử dụng trang tải xuống [Dortania builds](https://dortania.github.io/builds/)

:::info
Bạn nên sử dụng cách đầu tiên, vì tải từ chính chủ nó vẫn ổn nhất, ngoài ra trong những dự án này đều sẽ có document cụ thể.
:::

## Danh mục Kext

### Kext bắt buộc phải có

- [**VirtualSMC.kext**](https://github.com/acidanthera/VirtualSMC/releases)
  - Giả lập chip SMC trên realmac, không có nó thì không boot được macOS
  - Thay thế cho FakeSMC đã cũ

- [**Lilu.kext**](https://github.com/acidanthera/Lilu/releases)
  - Kext dùng để patch nhiều tiến trình, yêu cầu cho AppleALC, WhateverGreen, VirtualSMC và rất nhiều kext khác, nếu không có Lilu, chúng sẽ không chạy.
  - Ngày xưa khi chưa có Lilu, gần như mọi việc bạn sẽ cần làm thủ công, Lilu cho phép chỉnh sửa các kext và hệ thống macOS khi boot, ví dụ lúc trước nếu bạn patch AppleHDA, bạn sẽ phải chỉnh sửa và thay thế AppleHDA.kext trong hệ thống, còn bây giờ, AppleALC thông qua lilu sẽ chỉnh sửa AppleHDA.kext trong quá trình khởi động.

### VirtualSMC Plugins

Khi bạn tải xuống kext VirtualSMC, sau khỉ giản nén bạn sẽ thấy rằng có những kext khác trong đó. Những kexts khác này là plugin của VirtualSMC, chúng không cần thiết cho quá trình cài đặt macOS. Liệt kê chức năng của các plugin này:

+ **SMCProcessor.kext**
  - Dùng để theo dõi nhiệt độ CPU, 
  - Không hoạt động với CPU AMD
+ **SMCSuperIO.kext**
  - Được sử dụng để theo dõi tốc độ của quạt
  - không hoạt động với CPU AMD
+ **SMCLightSensor.kext**
  - Dùng cho laptop, để sử dụng với cảm biến ánh sáng xung quanh
  - Hầu hết laptop đều không có cảm biến này nên dù có sử dụng thì nó cũng chỉ là fake device.
+ **SMCBatteryManager.kext**
  - Dành cho cho laptop, được sử dụng để đọc và hiển thị chính xác dung lượng pin
+ **SMCDellSensors.kext**
  - Dành cho một số máy Dell, kể cả laptop lẫn PC
  - Cho phép theo dõi và điều chỉnh tốc độ quạt trên máy Dell hỗ trợ System Management Mode(SMM)

### Graphics

- [**WhateverGreen**](https://github.com/acidanthera/WhateverGreen/releases)
  - Cơ bản, tất cả GPU đều cần kext này
  - Để cho graphics patching, DRM fix, board ID check, framebuffer fix, ...

### Audio

- [**AppleALC**](https://github.com/acidanthera/AppleALC/releases)
  - Dùng để patch AppleHDA, giúp card âm thanh hoạt động trong macOS
  - Hỗ trợ hầu hết card âm thanh tích hợp
  - AppleALCU.kext trong thư mục là phiên bản rút gọn của AppleALC chỉ hỗ trợ digital audio, VD như ALC4080 USB Audio trên main Z590 Vision D
  - AMD 15h/16h sẽ gặp vấn đề với AppleALC và hệ thống Ryzen/Threadripper gần như không dùng được mic
  - Để biết danh sách chi tiết các card âm thanh hỗ trợ, vui lòng tham khảo: [AppleALC Supported codecs](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs)
  - Sau khi thêm kext này, bạn vẫn còn phải chỉnh sửa trong config, phần device properties hoặc boot-args thì card âm thanh mới hoạt động

- [**VoodooHDA.kext**](https://sourceforge.net/projects/voodoohda/)
  - Trình điều khiển card âm thanh cũ hơn và cổ điển
  - Nếu AppeALC.kext không hỗ trợ thì mới nghĩ tới kext này
  - Trải nghiệm âm thanh khi sử dụng kext này không hoàn hảo như AppleALC.kext

### Ethernet

Tuỳ vào cấu hình máy bạn, chọn kext phù hợp với card Ethernet trong máy

+ [**AtherosE2200Ethernet**](https://github.com/Mieze/AtherosE2200Ethernet/releases)
  - Cần thiết cho Atheros Qualcomm và Killer NICs
  - Lưu ý: Atheros Killer E2500 thực sự dựa trên Realtek, vì vậy hãy sử dụng trình điều khiển RealtekRTL8111
+ [**IntelMausi**](https://github.com/acidanthera/IntelMausi/releases)
  - Dành cho Intel NICs
  - Chính thức hỗ trợ các NIC 82578, 82579, I217, I218 và I219 của Intel
  - Các NIC dựa trên chipset I211 cần sử dụng kext SmallTreeIntel82576
+ [**SmallTreeIntel82576**](https://github.com/khronokernel/SmallTree-I211-AT-patch/releases)
  - Dùng cho Intel I211 NICs
  - Cần thiết cho hầu hết các mainboard AMD có NIC Intel I211 
+ [**RealtekRTL8111**](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
  - Dành cho Realtek Gigabit Ethernet
  - Lưu ý: Đôi khi phiên bản kext mới nhất có thể không hoạt động bình thường, bạn có thể thử phiên bản cũ hơn vào lúc này.
+ [**RealtekRTL8100**](https://www.insanelymac.com/forum/files/file/259-realtekrtl8100-binary/)
    - Dành cho NIC Realtek's RTL810X Fast Ethernet
    - Một số mainboard pc và laptop đời cũ sẽ dùng kext này

+ [**LucyRTL8125Ethernet**](https://www.insanelymac.com/forum/files/file/1004-lucyrtl8125ethernet/)
  - Dành cho Realtek 2.5Gb Ethernet

+ **Intel I225-V NIC**
  - Được dùng trên các mainboard Cometlake cao cấp trở về sau
  - Không cần kext nhưng cần phải chỉnh sửa device properties, sẽ đề cập sau
+ **Intel I350 NIC**
  - Xuất hiện trên các mainboard HEDT X79, C602
  - Không cần kext nhưng cần phải chỉnh sửa device properties, sẽ đề cập sau

### USB Kext

:::info
Kể từ macOS 11.3.1 trở về sau, việc patch portlimit đã không còn khả dụng dẫn tới xử lý phần USB không còn dễ dàng như trước. Nhưng rất may mắn, USBToolBox ra đời đã giúp xử lý vấn đề map usb trong Windows một cách dẽ dàng. Tôi sẽ nói rõ vấn đề này trong phần sau cài đặt!
:::

+ [**USBInjectAll**](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/)
  - Kext dành cho Intel USB do Rehabman phát triển 
  - Bản 0.7.1 được phát hành vào 11/2018 là phiên bản cuối cùng và nó đã không được cập nhật kể từ đó cho nên nó không tương thích với các mainboard mới với phần cứng USB Hub mới
  - Được sử dụng để inject Intel USB Controller vào macOS trên các mainboard mà không định nghĩa các cổng USB trong ACPI (tôi sẽ giải thích trong phần nâng cao)
  - Mặc dù một số mainbaord PC Skylake trở lên không cần kext này, nhưng nhiều trường hợp mainboard mới hơn lại không thể thiếu nó, tốt nhất bạn vẫn cứ thêm vào
  - Không hoạt động với AMD CPU

<details>
  <summary><strong>Lời cảm ơn huyền thoại Rehabman!</strong></summary>
  <div>
    <p>Khi viết đến đây, đã lâu tôi không truy cập vào đường link github của Rehabman, tôi tràn đầy cảm xúc. RehabMan có thể nói là một huyền thoại trong Hackintosh, (tôi không biết rõ tuổi của Rehabman, nên sẽ gọi là boss) boss là mod của diễn đàn Tonymacx86. Rất nhiều kexts, guide hackintosh nổi tiếng đều do boss viết và duy trì, nhưng sau 10 năm vì nhiều lý do khác nhau boss không còn hoạt động và biến mất khỏi tất cả các nền tảng. Có người nói boss về với Apple như Piker Alpha, một huyền thoại khác!</p>
    <p>Từ những ngày đầu đặt chân lên con đường hackintosh này, những guide của boss viết đã khai sáng tôi. Bắt đầu với con laptop HP 450 G1 nghe theo mấy cái web bảo dễ cài nên mua, và đúng là định mệnh nếu không có guide HP hotpatch của boss thì đúng là khó vãi cả linh hồn! Boss hoạt động rất tích cực trong hơn 10 năm trời, hỗ trợ người chơi trên diễn đàn miễn phí, nhưng mà rồi đam mê thì cũng giảm dần theo thời gian. <a href="https://www.tonymacx86.com/threads/best-moderator-ever-rehabman.156548/page-2"><b>Bài viết cuối</b></a> của boss vào đầu năm 2019 với nội dung như sau: <strong>Still around, but busy with other (real life) things. Will not be able to respond to all the queries here. People need to learn to read.</strong></p>
    <p>Rất khâm phục boss không biết mệt mỏi, chia sẻ và giúp đỡ rất nhiều người chơi hackintosh. Chắc là boss cũng rất mệt mỏi với những câu hỏi không rõ đầu đuôi, không cấu hình máy, không đính kèm EFI, không một mô tả lỗi rõ ràng. Cá nhân tôi đã thấy chán nản khi hỗ trợ như vậy trong 2-3 năm trong một group facebook hackintosh cũ, giờ tôi chỉ hỗ trợ ít và nhận dịch vụ hackintosh. Nhiều người khi sau khi giải quyết được vấn đề thì đến một câu cảm ơn cũng không có, cũng không feed back lại để cho những người khác biết cách giải quyết vấn đề đó. Cho nên là tôi rất không thích những người thích mì ăn liền vào chỉ để xin EFI. Quan điểm của tôi ảnh hưởng từ boss: cho người ta cái cần câu chứ không phải con cá! Mọi người cần tìm hiểu vấn đề trước khi hỏi!</p>
    <p><b>Một lần nữa xin gửi lời cảm ơn chân thành đến huyền thoại Rehabman!</b></p>
  </div>
</details>

+ [**USBInjectAll**](https://github.com/daliansky/OS-X-USB-Inject-All/releases)
  - Là một bản fork repos của Rehabman do daliansky duy trì (cũng là một pro hackintosh từ trung quốc)
  - Vẫn được phát hành thường xuyên, hỗ trợ các mainboard intel 400 500 600 series

+ [XHCI-unsupported](https://github.com/RehabMan/OS-X-USB-Inject-All)
  - Cần cho non-native USB controllers 
  - PC AMD CPU không cần 
  - Mainboard chipsets cần phải có kext này: X79, X99, X92,9 H410, B460, H510, B560

+ [USBToolBox](https://github.com/USBToolBox/kext)
  - Kext và tool USB mới, cứu tinh cho hackintosh, dùng trên windows giúp map usb nhanh và tiện

### WiFi/Bluetooth

#### Intel

+ [AirportItlwm](https://github.com/OpenIntelWireless/itlwm/releases)
  - Hỗ trợ rất nhiều card wifi intel trước kia thì chỉ có thể thay card
+ [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases)
  - Hỗ trợ Bluetooth hoạt động trong macOS nhưng vẫn còn nhiều hạn chế

#### Broadcom

+ [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
  - Dùng để patch non-Apple/non-Fenvi Broadcom card như dòng BCM94352
+ [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM/releases)
  - Dùng để sửa lỗi firmware trên Broadcom Bluetooth, Dùng cho tất cả non-Apple/non-Fenvi Airport card.

### Extras

+ [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  - Chặn AppleMCEReporter kext gây panic trên hệ thống AMD CPU
  - Tác dụng với SMBIOS: MacPro6,1 MacPro7,1 iMacPro1,1

+ [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases)
  - Cần để đồng bộ TSC trên một số máy HEDT và main server, nếu thiếu thì máy có thể chạy chậm, giật lag
  - Một số laptop Dell và ASUS cũng cần kext này
+ [NVMeFix](https://github.com/acidanthera/NVMeFix/releases)
  - Sửa lỗi power management cho non-Apple NVMe
+ [CtlnaAHCIPort](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/CtlnaAHCIPort.kext.zip)
  - Hỗ trợ một số SATA controller trên macOS Big Sur trở đi, do những controller đã bị apple bỏ đi, không native nữa
  - Nếu gặp trường hợp không nhận ổ cứng SATA thì phải thêm kext này

### Laptop Input

Dựa vào phần cứng trackpad có trên máy mà chọn kext phù hợp, kext cho bàn phím và trackpad

:::info
Đa số bàn phím laptop là PS2! Một số laptop ASUS, MSI dùng bàn phím USB!
:::

#### PS2 Keyboards/Trackpads

+ [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases)
  - Hoạt động với PS2 keyboard, mice, và trackpad
+ [RehabMan's VoodooPS2](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/)
  - Dành cho những máy đã cũ xài PS2 keyboard, mice, and trackpad, thường là intel gen 2/3

#### SMBus Trackpads

+ [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/)
  + Dành cho máy dùng Synaptics SMBus trackpad
  + Các máy Thinkpad và một số máy HP sẽ cần kext này
+ [VoodooSMBus](https://github.com/VoodooSMBus/VoodooSMBus/releases)
  - Dành cho máy dùng ELAN SMBus Trackpad
  - Cụ thể là cho máy T480, T480, L380

#### I2C/USB HID Devices

+ [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C/releases)
  - Bao gồm VoodooI2C và các plugin dành cho các loại I2C trackpad/touch khác nhau
  - Cụ thể về các plugin xem bảng dưới

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

* [ECEnabler](https://github.com/1Revenger1/ECEnabler/releases)
  * Sửa lỗi hiển thị phần trăm pin trên laptop mà không cần patch acpi
* [BrightnessKeys](https://github.com/acidanthera/BrightnessKeys/releases)
  * Sửa lỗi phím tăng giảm độ sáng không hoạt động

:::info
Nếu bạn muốn tìm hiểu thêm về kext vui lòng xem danh sách [Kexts.md](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Kexts.md) này
:::