---
title: Kích hoạt Auido với AppleALC
---

## Hiểu về cách hoạt động của AppleALC

AppleALC là kext cho hackintosh giúp kích hoạt audio. Cơ chế hoạt động của nó là chỉnh sửa AppleHDA lúc boot. Cụ thể là  AppleALC thông qua qua Lilu chỉnh sủa code gốc, tiêm dữ liệu platform, layout vào AppleHDA.

Truy cập repo [AppleALC](https://github.com/acidanthera/AppleALC), và thư mục Resources bạn sẽ thấy rất nhiều thư mục với tên là các Codec, đây chính là kho dữ liệu sẽ tiêm vào AppleHDA tuỳ theo codec-id của card audio trong máy và layout-id mà bạn chọn!

![applealc-resource.png](/img/docs/post-install/applealc-resource.png)

> AppleALC là một database chứa dữ liệu của các loại card audio do người dùng tự đóng góp!

## Chọn layout-id phù hợp

Tôi đã từng đề cập về `layout-id` trong phần config, cần có thông số này để AppleALC xác định tiêm dữ liệu nào vào (không cần biết là loại card nào vì AppleALC dựa theo codec-id mà xác định được)

Tham khảo danh sách các layout-id theo codec audio mà AppleALC hỗ trợ: [AppleALC Supported Codecs](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs).

Nhưng mà với danh sách này thì bạn cũng sẽ khó chọn `layout-id`, đặc biệt là những codec có rất nhiều layout như ALC256, ALC255, ALC269. Vì vậy bạn cần xem thêm thông tin của từng codec bằng cách click vào link trong cột Codec:

![applealc-sp.png](/img/docs/post-install/applealc-sp.png)

Lấy ví dụ với laptop của tôi, Thinkpad X1 Carbon Gen 6, codec ALC285:

+ Truy cập vào [ALC285 Info](https://github.com/acidanthera/AppleALC/blob/master/Resources/ALC285/Info.plist)
+ Xem xét và thấy ngay layout 21 chính xác là cho máy tôi, chọn luôn 21

Một ví dụ khác, Dell Latitude 7490, codec ALC256:

+ Truy cập vào [ALC256 Info](https://github.com/acidanthera/AppleALC/blob/master/Resources/ALC256/Info.plist)
+ Bạn sẽ chả thấy layout nào cho chính xác máy này nhưng sẽ thấy có một số cho máy Dell khác bao gồm 11, 13, 14, 21, 56
+ Hãy thử từng layout xem layout nào là tốt nhất cho máy của bạn (với con máy này thì 13 là ok)
+ Nếu thử tất cả toàn bộ layout-id mà không cái nào lên được audio thì xin chia buồn, bạn sẽ phải tự tìm hiểu **patch AppleHDA**,

:::info

+ Layout-id từ 1 đến 10 thường là cho dev phát triển kext làm base layout, người dùng có thể dựa trên các layout này mà tạo ra các layout mới cho codec trên máy của họ.
+ Các layout-id thường sẽ ghi rõ cụ thể cho máy nào vì do chúng được cộng đồng đóng góp, học tự patch HDA và chia sẻ cho người khác bằng cách contribute cho AppleALC.
:::

:::tip Kinh nghiệm chọn layout-id

+ Đối với Desktop: đặt 1, 3, 5, 7 đa số là lên, không vào tra rồi thử tiếp
+ Đối với laptop:
  + Thử layout mà cùng hãng máy trước, lý do đơn giản thôi khả năng là dùng chung phần cứng cao (VD như laptop Acer toàn dùng ALC255, dùng layout 3 là lên hết)
  + Thử các base layout, may thì lên cả loa cả tai nghe, không may thì cũng có cái xài tạm, rồi đi thử layout còn lại
:::

## Chỉnh sửa layout-id trong config

Tôi đã đề cập trước đây:

+ Thêm thông số `alcid=xx` trong `boot-args`, thay `xx` bằng layout mà bạn đã chọn được!

  ![boot-args-layout.png](/img/docs/post-install/boot-args-layout.png)

+ Thêm thông tin `layout-id` trong **Device Properties**
  + PCI Path:
    + Broadwell trở về trước: `PciRoot(0x0)/Pci(0x1B,0x0)`
    + Skylake trở về sau: `PciRoot(0x0)/Pci(0x1F,0x3)`
  + Type: Data hoặc Number
  + Value:
    + Nếu type Number, gõ đúng layout vào: `28`
    + Nếu type Data, đổi qua hệ 16 rồi điền: `1C000000` (= 28), `15000000` (= 25)

  ![dp-layout.png](/img/docs/post-install/dp-layout.png)
