---
title: Map USB
---

:::info
Map usb để có thể sử dụng đầy đủ các cổng cần thiết và loại bỏ những cổng không dùng!
:::

## Tại sao phải map usb?

Nguyên nhân chính là macOS sẽ chỉ nhận tối đa 15 port usb!

Bạn sẽ tự hỏi: máy mình cũng đâu có tới 15 cổng usb đâu thì đâu có gì phải lo?

Xin giải thích như sau:
+ 15 port usb ở đây không phải là 15 cổng usb vật lý:
  + Một cổng usb 3.x vật lý (màu xanh/đỏ/vàng/cam) sẽ có 2 kết nối (1 `port 2.` và 1 `port 3.`) tới usb controller trong mainboard. Đây là lý do bạn có thể cắm thiết bị usb 2. và 3. vào cổng này đều nhận đúng tốc độ.
  + Còn cổng usb 2.x vật lý chỉ có 1 kết nối 2. tới usb controller, bạn cắm thiết bị gì cũng nhận nhưng nếu cắm thiết bị usb 3. vào cổng này thì cũng chỉ nhận tốc độ của 2.

+ Trong mainboard Intel, sẽ có hơn 15 port usb (thường là 26 port) được quy định trong các bảng ACPI, cụ thể:
  + 10 hoặc 14 `port 2.` : `HS01`, `HS02`, `HS03`, ..., `HS14` (vị trí từ 1 -> 14)
  + 2 `port USR` (có thể không có): `USR1`, `USR2` (không khi nào dùng) (vị trí: 15 -> 16)
  + 6 hoặc 10 `port 3.` : `SS01`, `SS02`, ..., `SS10` (vị trí 17 -> 26)
  + Nếu chỉ nhận 15 port thì thường chỉ nhận đủ 10 hoặc 14 `port 2.`, 2 port USR, một hoặc vài `port 3.`

Giải pháp cho vấn đề trên
+ Tăng giới hạn từ 15 lên 26 port để nhận đẩy đủ tất cả các port
  + Đây là chức năng của quirk `XHCIPortLimit` trong `Config>Kernel>Quirks`, Clover cũng có quirk tương tự
+ Nhưng mà sẽ có nhiều port không dùng, và chúng có thể gây lỗi sleep, cần phải map usb để lọc ra những port dùng và bỏ đi các port không dùng
  + Kể từ macOS 11.3 thì `XHCIPortLimit` sẽ gây lỗi, gây ra dừng khi boot vào bộ cài mac. Vậy bắt buộc phải map usb trước hoặc cắm usb vào cổng 2.0 mới cài được!

Ngoài ra map USB còn là để nhận đúng tốc độ của các cổng USB. Nếu bạn không có kext USB nào cả, các cổng usb có thể dùng nhưng type của chúng mặc định sẽ là `internal` và sẽ không chạy đúng tốc độ!
`USBInjectAll.kext` giúp macOS nhận tất cả các port và đúng tốc độ dựa vào các profile usb có sẵn trong kext!

Hiện tại với sự ra đời của **[USBToolBox](https://github.com/USBToolBox/tool)** bạn có thể dễ dàng map usb trong Windows hoặc WinPE, rất tiện lợi và nên làm trước khi tạo USB cài!
Còn trong macOS bạn có thể dùng **[Hackintool](https://github.com/headkaze/Hackintool)** hoặc **[USBMap](https://github.com/corpnewt/USBMap)**

## Map USB bằng USBToolBox

## Map USB bằng Hackintool

## Map USB bằng USBMap