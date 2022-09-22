---
title: Hạn chế của Hackintosh
---

Hackintosh vẫn còn nhiều giới hạn về phần cứng và một số không thể khắc phục, nhưng rất may là đa số phần cứng hiện nay đều có thể dùng. Rất dễ hiểu thôi Apple :apple: chỉ hỗ trợ realmac, không hỗ trợ hackintosh, tất cả bootloader, kext, các bản vá lỗi đều do cộng đồng phát triển.

:::info
Tôi sẽ không đề cập đến các phần cứng quá cũ như CPU Intel Gen 1, ... Vì tôi không có kiến thức về chúng, cũ quá cho nó nghỉ được rồi, cố cài vào cho khổ mà nó yếu quá thì cũng không làm được gì!
:::

Điểm qua một số hạn chế chính:

## CPU

### Intel Desktop CPUs

- Intel Core i đều được hỗ trợ
- còn Pentium và Celeron cần FakeCPUID
- Hiện tại Intel gen 11 và gen 12 vẫn hackintosh tốt, cần fake cpu id

| CPU code     | Ví dụ                              |
| ------------ | ---------------------------------- |
| Penryn       | tôi không có kiến thức mã CPU này! |
| Yonah        | tôi không có kiến thức mã CPU này! |
| Conroe       | tôi không có kiến thức mã CPU này! |
| Merom        | tôi không có kiến thức mã CPU này! |
| Penryn       | tôi không có kiến thức mã CPU này! |
| Lynnfield    | tôi không có kiến thức mã CPU này! |
| Clarkdale    | tôi không có kiến thức mã CPU này! |
| Sandy Bridge | Intel CPU Gen 2                    |
| Ivy Bridge   | Intel CPU Gen 3                    |
| Haswell      | Intel CPU Gen 4                    |
| Broadwell    | Intel CPU Gen 5                    |
| SkyLake      | Intel CPU Gen 6                    |
| Kaby Lake    | Intel CPU Gen 7                    |
| Coffee Lake  | Intel CPU Gen 8, 9                 |
| Comet Lake   | Intel CPU Gen 10                   |
| Tiger Lake   | Intel CPU Gen 11                   |
| Alder Lake   | Intel CPU Gen 12                   |

### Intel High-End Desktop và Server CPUs được hỗ trợ

- Khó cài đặt

| CPU code         | Ví dụ                                  |
| ---------------- | -------------------------------------- |
| Nehalem          | tôi không có kiến thức mã CPU này!     |
| Westmere         | tôi không có kiến thức mã CPU này!     |
| Sandy Bridge-E   | i7-3960X、i7-3960K、i7-3820K           |
| Ivy Bridge-E     | i7-4960X、i7-4960K、i7-4820K           |
| Haswell-E        | i7 5960X、i7 5820K、i7 5930K           |
| Broadwell-E      | i7-6950X、i7-6900K、i7-6850K、i7-6800K |
| Skylake-X/W      | i7-7800X、i7-9800X、Xeon W-2104        |
| Cascade Lake-X/W | Xeon Gold 6142M                        |

### Intel Laptop CPUs

- Core "i", Core "m" và Xeon được hỗ trợ
- Dòng Atom, Celeron, Pentium thì không được do igpu không được hỗ trợ

| CPU code      | Ví dụ                                  |
| ------------- | -------------------------------------- |
| Clarksfield   | tôi không có kiến thức mã CPU này!     |
| Arrandale     | tôi không có kiến thức mã CPU này!     |
| Sandy Bridge  | Intel CPU Gen 2                        |
| Ivy Bridge    | Intel CPU Gen 3                        |
| Haswell       | Intel CPU Gen 4                        |
| Broadwell     | Intel CPU Gen 5                        |
| SkyLake       | Intel CPU Gen 6                        |
| Kaby Lake     | Intel CPU Gen 7                        |
| Kaby Lake - R | Intel CPU Gen 8 i5-8250U               |
| Whiskey Lake  | Intel CPU Gen 8 i5-8265U               |
| Coffee Lake   | Intel CPU Gen 8, 9  i5-8300H, i5-9300H |
| Comet Lake    | Intel CPU Gen 10 i5-10210U, i5-10300H  |
| Ice Lake      | Intel CPU Gen 10 i5-1035G4, i7-1065G7  |
| Tiger Lake    | Intel CPU Gen 11 không hỗ trợ          |

### AMD CPUs

- Desktop Bulldozer (15h), Jaguar (16h) and Ryzen (17h) có thể cài nhưng sẽ có hạn chế
- Laptop Ryzen không được hỗ trợ

| CPU code                     | Ví dụ                        |
| ---------------------------- | ---------------------------- |
| Bulldozer(15h) - Jaguar(16h) | FX-41X0、FX-6XX0、FX-81X0    |
| Ryzen                        | R5-3600X, R9-5900X           |
| Threadripper(17h and 19h)    | 1950X、2990WX、3990X、3995WX |

## GPU

### AMD

- AMD APUs (onboard graphic của AMD) không dùng được
- Dòng AMD Lexa không dùng được
- Dòng AMD Polaris trở về sau dùng tốt: RX 4XX, RX 5XX, Vega 56/64, RX 5X00, RX 6600, RX 6600XT, RX 6800XT, RX 6900XT, còn RX 6500XT, RX 6700XT không dùng được
- Dòng AMD cũ hơn có loại thì native có loại thì không dùng được, nhiều loại phải Fake GPU ID mới dùng được

### Nvidia

- Dòng Kelper (6XX, 7XX) native cho tới macOS Big Sur, macOS Monterey phải cài kext
- Dòng Maxwell, Pascal (9XX, 10XX) cần webdriver mới chạy nhưng chỉ hỗ trợ tối đa bản High Sierra 10.13.6
- Dòng Turing (16XX, 20XX), Ampere (30XX) không hỗ trợ
- Dòng Fermi trở về trước có thể cài Sierra 10.12 trở về trước nhưng đã cũ quá rồi nên bỏ đi

### Intel

- HD Graphics của CPU Celeron, Pentium, Atom đều không dùng được, PC thì phải có thêm card rời
- Hiện tại iGPU của dòng Tiger Lake (gen 11), Alder Lake (gen 12) không dùng được
- Desktop: HD 2500 tạch, HD 4000 trở đi dùng được
- Laptop: HD 3000 tối đa 10.13.6, HD 4000 tối đa 10.15.7, HD 4XXX trở về sau có thể cài bản mac mới nhất

:::info

- Để tra rõ hơn về GPU, vui lòng truy cập [GPU Buyers Guide](https://dortania.github.io/GPU-Buyers-Guide/)
- Card rời trên laptop thì đa số không dùng được nên đừng hi vọng cài bản macOS cũ thì nó chạy, và HDMI/DP nếu xuất từ card rời nữa thì cũng không dùng được luôn!
:::

:::caution
Không nhầm lẫn VGA là GPU, nó chỉ là một loại cổng xuất hình và đa số trường hợp không hoạt động trên macOS!
:::

## Mainboard

### Intel

- Đa số main dòng B, H, Z đều được hỗ trợ.
- Main dòng X hay main server thì khó cài đặt, có thể sẽ phải mod bios!
- Nếu xác định không dùng card rời thì mainboard phải có cổng HDMI/DP/DVI.

### AMD

- Đa số mainboard cho AMD CPU hiện nay đều có thể hackintosh (Nhưng có một vài hạn chế).

## Ổ cứng

- Tất cả các đĩa cứng eMMC đều không thể điều khiển được (phổ biến ở một số máy tính bảng hoặc máy tính xách tay cấp thấp)
- Cơ bản tất cả các đĩa cứng SATA đều được hỗ trợ, nhưng nếu dùng ổ cứng chất lượng kém sẽ ảnh hưởng tới trải nghiệm sử dụng
- Phần lớn ổ cứng NVME có thể cài đặt macOS nhưng cũng có nhiều mẫu NVME sẽ gây lỗi hoặc hoạt động rất tệ

- Danh sách các ổ cứng mà TRIM không hoạt động hoàn hảo (có thể được sử dụng khi TRIM bị vô hiệu hóa hoặc lưu dữ liệu)
  - Samsung 950 Pro
  - Samsung 960 Evo/Pro
  - Samsung 970 Evo/Pro (Cần dùng firmware mới nhất)
- Danh sách ổ cứng mà TRIM hoạt động hoàn hảo
  - Western Digital Blue SN550
  - Western Digital Black SN700
  - Western Digital Black SN720
  - Western Digital Black SN750 (bao gồm cả mã OEM SN730)
  - Western Digital Black SN850
  - Intel 760p (bao gồm mẫu OEM như SSDPEMKF512G8）
  - KingDian S280
  - Kingchuxing
  - Crucial P1 1TB NVME (SM2263EN)
  - KingDian S280
  - PLEXTOR M5Pro (SATA)
  - Samsung 850 EVO/PRO (SATA)
  - Samsung 860 EVO/PRO (SATA)
  - Samsung 870 EVO/EVO (SATA)
- Không tương thích với IONVMeFamily hoặc có các vấn đề lạ khác (không mua nó, nếu có sẵn sẽ phải thay nếu không máy sẽ bị kẹt khi khởi động, v.v.), trên macOS Monterey sẽ cực kì dễ gặp lỗi với những mã này
  - 512 GB GIGABYTE M.2 PCIe SSD (VD GP-GSM2NE8512GNTD）
  - ADATA Swordfish 2 TB M.2-2280
  - SK Hynix HFS001TD9TNG-L5B0B
  - SK Hynix P31
  - PC601/PC611/PC711/BC501（chủ yếu được tìm thấy trong máy tính xách tay Lenovo và Dell, một số lô không thể cài đặt macOS)
  - Samsung PM961/PM981/PM981a/PM991
  - Samsung 983ZET
  - Micron 2200V MTFDHBA512TCK
  - Micron 2200S
  - Intel 600P/660P/760P (với một số vấn đề lạ)
  - Kingston A2000 (Cần [NVMeFix.kext](https://github.com/acidanthera/NVMeFix)）
  - Asgard AN3+ (STAR1000P)
  - Netac NVME SSD 480
  - Kingmax NVME SSD

## Ethernet

Hầu hết tất cả các loại LAN đều được hỗ trợ trong macOS, thông qua trình điều khiển tích hợp sẵn hoặc kext do cộng đồng tạo ra. Nhưng cũng có một số LAN phức tạp:

- Intel I225 2.5Gb NIC

  - Mainboard Comet Lake cao cấp sẽ có như Z490 Z590 Z690
  - Giải pháp：[hackintosh-forum.de](https://www.hackintosh-forum.de/forum/thread/48568-i9-10900k-gigabyte-z490-vision-d-er-läuft/?postID=606059#post606059) hoặc [fake device-id](https://dortania.github.io/OpenCore-Install-Guide/config.plist/comet-lake.html#deviceproperties)

- Intel I350 1Gb NIC

  - Xuất hiện trong mainboard Intel và Supermicro
  - [Giải pháp](https://dortania.github.io/OpenCore-Install-Guide/config-HEDT/ivy-bridge-e.html#deviceproperties)
  
- Intel 10Gb NIC

  - [Giải pháp cho X520 và X540](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/)

- Mellanox và Qlogic NIC

## Wifi - Bluetooth

- Card wifi đi kèm với hầu hết các máy tính xách tay không được hỗ trợ bởi Apple
- Card wifi tốt nhất là của Broadcom được sử dụng bởi Apple (hàng tháo máy real mac)
- Card wifi Intel đã có thể hoạt động tốt, tuy nhiên bluetooth intel vẫn đang khá là bất ổn
- Wifi Broadcom dòng BCM9452ZAE(cần kext và patch), BCM9452 (cần kext), BCM94331(cần kext từ Catalina trở đi), BCM94360 (native) hoạt động tốt, đầy đủ tính năng airdrop, handoff
- Wifi Atheros/Qualcom có sẵn trên laptop hiện nay đều tạch, có mấy mã atheros dùng được nhưng đã hết hỗ trợ và chuúng nó cũng bắt sóng rất yếu nên tôi không muốn đề cập cụ thể
- Có thể dùng usb wifi, usb bluetooth được hỗ trợ (giá rất rẻ)
- Sau đây là liệt kê những card wifi có thể hoạt động tốt, native, dùng được tất chức năng của mac bao gồm airdrop, handoff

### Broadcom PCIe NIC

Dùng trên PC, card wifi được gắn trên một adapter gắn vào khe PCIe trên main board

- BCM943602CDP
- BCM943602CD
- BCM94360CD
  - Fenvi FV T919 (Bluetooth 4.0)
  - Fenvi AC1900（Không có Bluetooth，EOL）
  - TP-LINK Archer T9E AC1900（Không có Bluetooth，EOL）
  - TP-LINK Archer T8E（Không có Bluetooth）
  - RNX-AC1900PCE（Không có Bluetooth）
  - ASUS PCE-AC66（Không có Bluetooth）
  - ASUS PCE-AC68（Không có Bluetooth）
- BCM94331CD（Cần thêm kext kể từ Catalina trở đi）
- BCM94360CS2
  - Fenvi FV-HB1200 (Bluetooth 4.0)
  - Card Wifi AWD (không có bluetooth)
- BCM943602CS
- BCM94360CSAX
- BCM94360CS
- BCM94352Z
  - TP-LINK Archer T6（Không có Bluetooth）
  - Rosewill RNX-AC1300PCE（Không có Bluetooth）
  - ASUS PCE-AC56（Không có BT ）
- BCM94350ZAE

### Broadcom Mini PCIe

- **BCM94360HMB** (ABGN+AC, BT 4.0, 3x3:3):
  - AzureWave AW-CB160H
  - Alpha Networks WMC-AC01
  - Arcadyan WN8833B-AC
  - Gemtek WMDB-150AC
  - Unex DAXB-81
  - Wistron NeWeb DNXB-C1
- **BCM94352HMB** (ABGN+AC, BT 4.0, 2x2:2):
  - AzureWave AW-CE123H
  - Dell DW1550
  - HP TPC-Q013
  - Lenovo Lite-On WCBN606BH

### Broadcom M.2

- BCM94360NG
  - Fenvi BCM94360NG(A+E Key, natively supported as based off of genuine Apple Airport card)(BT 4.0)
- BCM943602
  - Dell DW1830 (A+E Key, quite wide so make sure your laptop has room)(BT 4.1)
- BCM94352Z
  - Fenvi AC1200 (A+E Key, natively supported as based off of genuine Apple Airport card)(BT 4.0)
  - Dell DW1560 (A+E Key)(BT 4.0)
  - Lenovo Lite-On WCBN802B(04X6020)(E Key)(BT 4.0)
  - AzureWave AW-CB162NF(A+E Key)(BT 4.0)
- BCM94350ZAE
  - Lenovo Foxconn T77H649(A+E Key)(BT 4.1)
  - Lite-On WCBN808B(A+E Key)(BT 4.1)
  - Dell DW1820A (A+E Key)(BT 4.1)

:::info

- Để xem chi tiết vấn đề về card wifi cho hackintosh, vui lòng truy cập [Wireless Buyers Guide](https://dortania.github.io/Wireless-Buyers-Guide/)
- Để xem hướng dẫn về card wifi cho hackintosh, vui lòng tham khảo [OpenIntelWireless](https://openintelwireless.github.io/itlwm/Compat.html)
  
:::

## Audio

- Đa số codec audio đều được hỗ trợ bởi kext AppleALC, xem danh sách codec và layout-id được hỗ trợ
  - [AppleALC Supported Codec](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs)
- Intel Smart Sound Technology không dùng được!
- Headphone Jack Combo đa số không hoạt động hết, bạn sẽ chỉ dùng mic internal không dùng được mic của tai nghe!
- Nếu bạn dùng tai nghe hay mic kết nối qua bluetooth hay usb thì đa số đều dùng bình thường

## Khác

:::caution
Các lỗi sau bạn có không chấp nhận được thì hãy mua realmac về dùng!
:::

- **Sleep/Wake** có thể không hoạt động
  - Tôi đã thử quá nhiều lần, tìm hiểu rất nhiều, nhưng rất hên xui, máy được máy không, cũng có thể do trình độ của tôi còn kém!
  - Cách xử lý dễ nhất đó là tắt sleep đi, chạy screensaver cho đẹp!
  - Bạn nào sống tiết kiệm, tiếc tiền điện thì cứ bỏ qua hackintosh!

- Thunderbolt USB-C hotplug
  - TB3 có thể dùng được, nhận thiết bị nhưng phải cắm trước lúc khởi động, không hotplug được, hoặc có thể hotplug một vài và sleep là sẽ lỗi luôn. Theo một số bài viết tôi đọc được thì có thể mod bios để chạy như realmac nhưng tôi không có nhiều kiến thức về mảng này nên không đề cập đến.

- Vân tay, Windows Hello không dùng được

## Tham khảo

- <https://github.com/dortania/bugtracker/issues/192>
- <https://github.com/acidanthera/AppleALC/wiki/Supported-codecs>
- <https://dortania.github.io/Wireless-Buyers-Guide/>
