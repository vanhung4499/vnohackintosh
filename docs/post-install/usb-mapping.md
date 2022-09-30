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

:::tip
Nên dùng USBToolBox map usb trong Windows trước khi làm EFI cài mac!
:::


### Run

Tải xuống tool `Windows.zip` từ [USBToolBox/Tool](https://github.com/USBToolBox/tool/releases) và giải nén! Bạn cũng có thể tải `Windows.exe` nếu dùng Windows hoàn chỉnh, còn `Windows.zip` sẽ chạy được cả trong WinPE.

Tải sẵn thêm [`USBToolbox.kext`](https://github.com/USBToolBox/kext).

Chạy `USBToolBox/dist/Windows.exe` và bạn sẽ thấy cửa sổ cmd như sau:

![](/img/docs/post-install/usbtb-main.png)

### Xác định các cổng

Bấm `"D"` để vào `Discover Ports`:

![](/img/docs/post-install/usbtb-discover.png)

Cắm một thiết bị usb vào các cổng, mỗi cổng một lượt, cắm xong rút ra cắm cổng khác. Mỗi lượt cần chờ cho tới khi thiết bị hiển thị trong danh sách.

Cắm 1 thiết bị usb 2.0 và 1 thiết bị 3.0 vào các cổng 3.0 để xác định cả port 2.0 và 3.0 trong ACPI. Trên thực tế thì USBToolBox xác định được 2 port nào đang chung 1 một cổng vật lý xem `Companion to xx`!

Đối với các cổng USB-C, cắm thiết bị 2 lần, cần xoay ngược lại chiều và cắm lại!

Sau khi xác định xong bấm `"B"` để trở lại main menu

### Chọn port và tạo kext
Bấm `"S"` để vào `Select Pors`, bắt đầu chọn port nào sử dụng và bỏ đi port không dùng.

![](/img/docs/post-install/usbtb-select.png)

Một số port không thấy thiết bị đi kèm thì là chúng không được sử dụng, không cần quan tâm tới chúng.

Kể từ macOS 11.3 thì XHCIPortLimit không hoạt động được nên macOS sẽ giới hạn còn 15 port usb. Do đó cần chọn loại bỏ một số port hợp lý nếu số lượng port được dùng vượt quá 15!

Mặc định tool sẽ chọn tất cả các cổng được sử dụng (màu xanh lá cây), nếu bạn muốn chọn thêm hoặc bỏ đi một số cổng, hãy nhập vào chỉ số các port tách như sau:
+ `1,2,3,4` (với các số là port muốn thay đổi trạng thái chọn/bỏ)

Port type thường cũng đã được xác định sẵn, nếu có port này không đúng type, làm như một số ví dụ sau:
+ Đặt các port 7, 8, 9 thành USB 2: `T:7,8,9,10:0`
+ Đặt các port thành USB 3: `T:3,4,5,6,19,20,21,22:3`
+ Đổi port 2 và 18 thành type C: `T:2,18:9`
+ Đổi port 14 (usb bluetooth) thành internal: `T:14:255`

Một số loại port thường dùng:
```txt
USB 2 Type A: 0
USB 3 Type A: 3
USB-C Type C with switch: 9
USB-C Type C without switch: 10
Internal: 255
```

![](/img/docs/post-install/usbtb-port-type.png)


Trong ví dụ trên thì tôi chỉ cần bỏ đi port 1 là tròn 15 port, không cần làm gì thêm vì các port type đã đúng!

:::info Bind Companions
Khi mà chọn bỏ một port 2.0/3.0 nối với cổng usb 3.0 vật lý, tool sẽ tự động bỏ port 3.0/2.0 tương ứng, khá là khó chịu nếu chỉ muốn bỏ 1 port. Cần chỉnh như sau:
+ Từ main menu, bấm `"C"` vào **Change Settings** 
+ Bấm `"C"` để disable **Bind Companions**
+ Bấm `"B"` để back về main menu
:::

:::info
+ Dùng Type C with switch khi 2 port 2.0 và 3.0 có chung chỉ số vd: HS01 (port 1) và SS01 (port 17). Còn without switch thì tức không chung chỉ số.
+ Port USB 2 trong cổng 3.0 cũng phải đặt kiểu là USB 3, tức là 3.
:::

:::tip
Tôi thường ưu tiên giữ các port 3.0, bỏ một số port 2.0 trong cổng usb 3.0 vật lý, tức là khi cắm thiết bị 2.0 vào các cổng 3.0 mà đã bỏ port 2.0 của nó đi thì sẽ không nhận thiết bị!
:::

### Tạo kext UTBMap

Sau khi chọn xong xuôi, bấm `"K"` để tạo kext trong thư mục `dist`.

![](/img/docs/post-install/usbtb-build.png)

`UTBMap.kext` sẽ yêu cầu đi kèm với [`USBToolbox.kext`](https://github.com/USBToolBox/kext).

:::tip
USBToolbox xịn xò hơn những phương thức map usb khác ở chỗ nó không yêu cầu phải xác định cho SMBIOS nào!

Ví dụ bạn đang dùng smbios `iMac20,1` giờ bạn đổi qua `iMacPro1,1`, nếu dùng các kext khác bạn sẽ phải map lại hoặc đổi thông tin smbios trong `info.plist` ở trong kext! Còn với USBToolBox bạn chả cần sửa gì!
:::

### Thêm kext

Sau cùng thì bạn thêm 2 kext `USBToolBox.kext` và `UTBMap.kext` vào OC:
+ Kext vào `EFI/OC/Kexts`
+ Đừng quên thêm thông tin vào cả `Config > Kernel > Add` (lưu ý `UTBMap.kext` nằm sau `USBToolBox.kext`).
+ Loại bỏ các kext usb khác ra khỏi config và efi

:::danger
Đừng quên bỏ tích `XHCIPortLimit`!!!!
:::

## Map USB bằng Hackintool

Cập nhật sau

## Map USB bằng USBMap

Cập nhật sau
