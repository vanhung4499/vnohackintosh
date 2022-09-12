---
title: Tổng quan 
---

:::info
Tài liệu này cung cấp hướng dẫn về cấu hình OpenCore để giúp macOS hoạt động bình thường. Mở đầu cho mỗi phần, tôi sẽ giải thích các chức năng của các thành phần trong file **Config.plist** của OpenCore và sau đó sẽ tới phần chỉnh sửa **Config.plist** theo cấu hình máy.
:::

:::info
Do việc OpenCore vẫn cập nhật liên tục, việc viết theo guide [Dortania](https://dortania.github.io/OpenCore-Install-Guide/) thì mỗi lần cập nhật tôi sẽ phải chỉnh sửa rất nhiều bài viết. Thay vào đó tôi sẽ viết theo cấu trúc của file **Config.plist**.
:::

:::warning
Nếu phát hiện thấy sai lệch so với mô tả trong tài liệu trong phiên bản OpenCore đã phát hành, vui lòng báo lỗi cho tôi để chỉnh sửa kịp thời, xin chân thành cảm ơn!
:::

## Tìm hiểu về **plist**

### File .PLIST là file gì?

PLIST là Settings Files - Mac OS X Property List File, dưới định dạng Text and Binary được phát triển bởi Apple sử dụng trong các ứng dụng MacOS. Nó chứa các thuộc tính và các thiết lập cấu hình cho các chương trình khác nhau. File plist được định dạng trong XML và dựa trên Core Foundation DTD của Apple.

Khi mở một file plist theo dạng text bạn sẽ thấy ngay nó thực chất là một tập tin xml.

```plist title='Config.plist'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>#author</key>
	<string>vanhung4499</string>
	<dict>
		<key>Add</key>
		<array>
			<dict>
				<key>Comment</key>
				<string></string>
				<key>Enabled</key>
				<true/>
				<key>Path</key>
				<string>SSDT-AWAC.aml</string>
			</dict>
			<dict>
				<key>Comment</key>
				<string></string>
				<key>Enabled</key>
				<true/>
				<key>Path</key>
				<string>SSDT-EC-USBX.aml</string>
			</dict>
			<dict>
				<key>Comment</key>
				<string></string>
				<key>Enabled</key>
				<true/>
				<key>Path</key>
				<string>SSDT-PLUG.aml</string>
			</dict>
		</array>
        ...
```

### Phần mềm chỉnh sửa Config.plist

Một file Config.plist sẽ chứa rất nhiều key/value nên không rảnh rỗi mà ngồi viết tay thủ công từ dạng text làm gì cả, chúng ta sẽ cần những phần mềm đặc biệt để giải quyết vấn đề này. Sau đây là một số phần mềm tôi hay sử dụng:

+ [**OpenCore Configurator (OCC)**](https://mackie100projects.altervista.org/opencore-configurator/)
  + Đây là phần mềm tôi dùng nhiều nhất, 
  + Ưu điểm: 
    + Giao diện trực quan, dễ nhìn
    + Tích hợp rất nhiều công cụ hỗ trợ cho việc chỉnh sửa config lẫn cả efi
  + Nhược điểm: Chỉ hỗ trợ macOS, không dùng được trong Windows

+ [**OCAuxiliaryTools (OCAT)**](https://github.com/ic005k/OCAuxiliaryTools)
  + Đây là công cụ tuyệt vời được viết bằng QT C++ nên chạy được đa nền tảng
  + Ưu điểm: 
    + Giao diện trực quan, dễ nhìn
    + Tích hợp rất nhiều công cụ hỗ trợ cho việc chỉnh sửa config lẫn cả efi, tiện hơn cả OCC
    + Hỗ trợ đa nền tảng cả Windows, macOS và Linux 
  + Nhược điểm: Kể từ khi bắt đầu tung ra các phiên bản đầu tiên tới lúc tôi viết hướng dẫn này, giao diện phần mềm này thay đổi liên tục, mong là tới giai đoạn ổn định, giao diện không bị thay đổi quá nhiều nữa
    
+ [**ProperTree**](https://github.com/corpnewt/ProperTree)
  + Được viết bằng Python, hỗ trợ đa nền tảng
  + Ưu điểm:
    + Hỗ trợ đa nền tảng
    + Giao diện đơn giản, dễ nhìn
    + Tính năng snapshot mạnh mẽ
  + Nhược điểm:
    + Không nhiều tính năng như 2 phần mềm trên
    + Không hỗ trợ kéo thả thêm file vào config

:::tip
Nếu bạn dùng Windows hãy dùng OCAT, còn trong macOS thì dùng phần mềm nào cũng được.
:::

:::info
Tôi gần như không sử dụng ProperTree nên trong hướng dẫn này tôi sẽ không có hướng dẫn sử dụng nó!
:::

## Cấu trúc OpenCore Config.plist

:::warning
Như đề cập trong ở phần chuẩn bị, thì bạn sẽ chỉnh sửa file Sample.plist trong file OC đã tải xuống. Nếu bạn không biết file config ở đâu thì vui lòng đọc lại!
:::


OC Config bao gồm các phần độc lập, sẽ được giới thiệu lần lượt trong các bài viết sau. Theo mặc định, file Config.plist sẽ bật ít tính năng nhất có thể và tắt một số tính năng. Nói chung, **Config.plist** bao gồm các thành phần sau:

+ ACPI
+ Booter
+ DeviceProperties
+ Kernel
+ Misc
+ NVRAM
+ PlatformInfo
+ UEFI

![occ](/img/docs/opencore-config/occ.png)

Trong mỗi phần thường sẽ có những hoạt động sau:

+ Add：Thêm các file acpi, kext, driver
+ Delete：Xoá hay chặn các bảng acpi hoặc kext
+ Patch：Chỉnh sửa các thành phần gốc của ACPI hoặc macOS
+ Quirks：Các bản patch được cấp sẵn

:::tip
Trong phần Add, một danh sách các file cần thiết sẽ được tạo, OC sẽ dựa vào danh sách này mà tìm và load các file theo đúng vị trí trong EFI. Có 2 trường hợp sau:
- Nếu file có tồn tại trong EFI nhưng không có trong danh sách hoặc có nhưng không được enable thì file đó không được load. 
- Nếu file không tồn tại trong EFI nhưng trong danh sách trên lại có và được enable thì OC sẽ báo lỗi ngay khi boot vào, lỗi không tìm thấy file.
:::

:::info
Bạn có thể sử dụng **ocvalidate** để xác minh file config có lỗi cú pháp hay không? Lưu ý rằng phiên bản của **ocvalidate** phải khớp với phiên bản của OpenCore và có thể không phát hiện được tất cả các lỗi.
:::

