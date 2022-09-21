---
title: Kích hoạt Wifi và Bluetooth
---

:::info
Bài viết này chỉ dành cho những card wifi có thể hỗ trợ chỉ có một sỗ mẫu Broadcom và đa số card Intel hoặc USB wifi!
Nếu mà card trong máy bạn là Qualcom, Realtek, Ralink, ... thì bỏ qua và thay nó thôi!
:::

## Broadcom

### BCM94360

Các mã card wifi sau không cần fix gì cả, nhận native, dùng được airdrop:

+ BCM94360CS2 (2 râu)
+ BCM94360CS (3 râu)
+ BCM943602CS (3 râu)
+ BCM94360CD (4 râu)
+ BCM943602DCP (4 râu)
+ BCM94360NG
+ BCM94360Z4

:::info
2 con `NG` và `Z4` là được các pháp sư trung hoa phù phép biến hoá từ mấy con card Apple về hình dáng của card thường lắp cho máy Windows.
:::

### BCM94331

Thường thấy **BCM94331CSAX** và **BCM94331CD**:

+ Trước Catalina, hoạt động native, không chỉnh sửa gì!
+ Từ bản Catalina trở đi, phải thêm kext `AirportBrcmFixup` mới dùng được wifi, bluetooth tự nhận
+ Bluetooth của những mã card này không hoạt động được trên macOS Monterey

### BCM94352

Có 3 mã wifi sau:

+ Dell DW1560 (BCM94352Z)
+ Lenovo FRU 04X6020 (BCM94352Z)
+ Dell DW1550 (BCM94352HMB)

Đối với những card này phải thêm các kext vào OC:

+ Wifi:
  + [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
+ Bluetooth:
  + [BluetoolFixup](https://github.com/acidanthera/BrcmPatchRAM/releases) (Monterey) hoặc [BrcmBluetoothInjector](https://github.com/acidanthera/BrcmPatchRAM/releases) (Big Sur/Catalina)
  + [BrcmFirmwareData](https://github.com/acidanthera/BrcmPatchRAM/releases)
  + [BrcmPatchRAM3](https://github.com/acidanthera/BrcmPatchRAM/releases) (Catalina trở lên) hoặc BrcmPatchRAM2 (Mojave trở xuống)

:::danger
Khi dùng kext `AirportBrcmFixup` trong macOS Big Sur trở đi, bắt buộc phải bỏ kext plugin `AirPortBrcm4360_Injector` trong nó đi, nếu không sẽ không thể boot vào mac. Bỏ tích như sau:

![airportbrcmfixup-bigsur.png](/img/docs/post-install/airportbrcmfixup-bigsur.png)
:::

### BCM94350/BCM94356

Một 2 mã wifi sau:

+ Dell DW1820A
+ Lenvo BCM94350ZAE

Tương tự như trên, những card này cũng cần thêm kext:

+ Wifi:
  + [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases)
+ Bluetooth:
  + [BluetoolFixup](https://github.com/acidanthera/BrcmPatchRAM/releases) (Monterey) hoặc [BrcmBluetoothInjector](https://github.com/acidanthera/BrcmPatchRAM/releases) (Big Sur/Catalina)
  + [BrcmFirmwareData](https://github.com/acidanthera/BrcmPatchRAM/releases)
  + [BrcmPatchRAM3](https://github.com/acidanthera/BrcmPatchRAM/releases) (Catalina trở lên) hoặc [BrcmPatchRAM2](https://github.com/acidanthera/BrcmPatchRAM/releases) (Mojave trở xuống)

Nhưng cần thêm các tham số sau vào **boot-args**: `brcmfx-aspm` và `brcmfx-country=#a`

Nếu bluetooth không hoạt động sau khi sleep thì thêm vào **boot-args**: `bpr_probedelay=100 bpr_initialdelay=300 bpr_postresetdelay=300`

:::danger
Khi dùng kext `AirportBrcmFixup` trong macOS Big Sur trở đi, bắt buộc phải bỏ kext plugin `AirPortBrcm4360_Injector` trong nó đi, nếu không sẽ không thể boot vào mac. Bỏ tích như sau:

![airportbrcmfixup-bigsur.png](/img/docs/post-install/airportbrcmfixup-bigsur.png)
:::

## Intel

Hiện tại đa số card wifi intel đều có thể dùng được wifi ổn, bluetooth thì có thể không ổn định. Xem danh sách card wifi được hỗ trợ ở đây [OpenIntelWireless Compatibility](https://openintelwireless.github.io/itlwm/Compat.html#mvm-gen-1-iwm)

Lưu ý: card wifi intel không sử dụng được airdrop!

Cần thêm các kext sau:

+ Wifi: (Chỉ dùng 1 trong 2 kext, không được load cả 2 cùng lúc)
  + [AirportItlwm](https://github.com/OpenIntelWireless/itlwm/releases) (chọn đúng phiên bản mac bạn dùng) (**Khuyên dùng**)
  + [itlwm](https://github.com/OpenIntelWireless/itlwm/releases) + [HeliPort](https://github.com/OpenIntelWireless/HeliPort/releases) app
+ Bluetooth:
  + [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware)
  + [IntelBluetoothInjector](https://github.com/OpenIntelWireless/IntelBluetoothFirmware) (Big Sur trở xuống) hoặc [BluetoolFixup](https://github.com/acidanthera/BrcmPatchRAM/releases) (Monterey trở lên)
  + [IntelBTPatcher](https://github.com/OpenIntelWireless/IntelBluetoothFirmware)

:::info AirportItlwm vs itlwm
Cùng trong một repo, nhưng tạo ra 2 kext, chúng có vài điểm khác nhau:

+ Dùng AirportItlwm thì mac sẽ nhận là phần cứng là wifi, bạn sẽ kết nối được qua icon wifi trên top bar.
+ Dùng itlwm phải đi kèm thì mac sẽ nhận là phần cứng là ethernet và cần phải thông qua app HeliPort mới có thể kết nối
:::

## USB Wifi/Bluetooth

Có một vài mẫu usb wifi thường thấy ở VN như các các mẫu của TPLink (WN725N, WN823N, WN727N, WN722N) hay Comfast (CF-811AC) có thể dùng trong macOS.

Bạn cần cài đặt thêm [Wireless-USB-OC-Big-Sur-Adapter](https://github.com/chris1111/Wireless-USB-OC-Big-Sur-Adapter) để có thể sử dụng.

Video hướng dẫn cũng như danh sách usb wifi được hỗ trợ bạn tự xem thêm trong repo. Nhưng lưu ý cần phải làm 2 điều sau:

+ Disable `SecureBootModel` trong **config → Misc → Security**
+ Tắt SIP (Đã hướng dẫn trong phần [Config NVRAM](/docs/opencore-config/nvram))
