---
title: Kích hoạt Auido với AppleALC
---

## Hiểu về cách hoạt động của AppleALC

AppleALC là kext cho hackintosh giúp kích hoạt audio. Cơ chế hoạt động của nó là chỉnh sửa AppleHDA lúc boot. Cụ thể là  AppleALC thông qua qua Lilu chỉnh sủa code gốc, tiêm dữ liệu platform, layout vào AppleHDA.

Truy cập repo [AppleALC](https://github.com/acidanthera/AppleALC), và thư mục Resources bạn sẽ thấy rất nhiều thư mục với tên là các Codec, đây chính là kho dữ liệu sẽ tiêm vào AppleHDA tuỳ theo codec-id của card audio trong máy và layout-id mà bạn chọn!

![](/img/docs/post-install/applealc-resource.png)


> AppleALC là một database chứa dữ liệu của các loại card audio do người dùng tự đóng góp!

## Chọn layout-id phù hợp

Tôi đã từng đề cập về `layout-id` trong phần config, cần có thông số này để AppleALC xác định tiêm dữ liệu nào vào (không cần biết là loại card nào vì AppleALC dựa theo codec-id mà xác định được)

Tham khảo danh sách các layout-id theo codec audio mà AppleALC hỗ trợ: [AppleALC Supported Codecs](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs).

Nhưng mà với danh sách này thì bạn cũng sẽ khó chọn `layout-id`, đặc biệt là những codec có rất nhiều layout như ALC256, ALC255, ALC269. Vì vậy bạn cần xem thêm thông tin của từng codec bằng cách click vào link trong cột Codec:

![](/img/docs/post-install/applealc-sp.png)

