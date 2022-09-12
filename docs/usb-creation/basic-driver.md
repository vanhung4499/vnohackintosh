---
title: Giới thiệu về Driver
---

:::info
Driver ở đây là driver cho bootloader (OC hoặc Clover), chứ không phải driver cho OS. Chú ý đừng nhầm lẫn.
:::

## Driver mặc định của OC

`OC/Drivers` chứa các driver được OC cung cấp. Các driver là file có đuôi <code>.efi</code>，OC mô tả công dụng của chúng như sau：

- **AudioDxe.efi**：Phát âm thanh khi khởi động, giống như một real mac
- **CrScreenshotDxe.efi**：Để chụp ảnh màn hình giao diện khởi động, bấm F10 sẽ lưu lại ảnh chụp màn hình vào thư mục EFI
- **HiiDatabase.efi**：để sửa lỗi GUI như OpenShell.efi trên Sandy Bridge hoặc cũ hơn
- **NvmExpressDxe.efi**：để làm cho bo mạch chủ cũ hỗ trợ các thiết bị NVME, thường không bắt buộc sau Haswell
- **OpenCanopy.efi**：Driver cần thiết để sử dụng các theme OC
- **OpenHfsPlus.efi**：Driver file system để hỗ trợ các định dạng HFS+
- **OpenLinuxBoot.efi**：Driver mới được thêm vào OC 0.7.3 để khởi động hệ thống Linux
- **OpenPartitionDxe.efi**：Để boot các bản mac cũ, OS X 10.7 đến 10.9
- **OpenRuntime.efi**：Driver bắt buộc phải có trong OC với nhiều chức năng, đây là driver quan trọng nhất
- **OpenUsbKbDxe.efi**：Driver bàn phím USB để mô phỏng các phím tắt của Apple, tương đương với KeySupport trong config
- **Ps2KeyboardDxe.efi**：Driver bàn phím PS/2, đã quá cũ, không cần dùng
- **Ps2MouseDxe.efi**：Driver bàn phím PS/2, đã quá cũ, không cần dùng
- **UsbMouseDxe.efi**：Driver chuột USB, một số máy ảo cần driver để sử dụng chuột trong giao diện khởi động
- **XhciDxe.efi**：Driver XHCI USB controller, không cần driver này sau Sandy Bridge
- **ResetNvramEntry.efi**: Dùng để reset nvram, xuất hiện từ OC 0.8.1
- **ToggleSipEntry.efi**: Dùng để bật/tắt SIP, xuất hiện từ OC 0.8.1

## Driver hay dùng

Trong tất cả các trường hợp, hai driver sau bắt buộc phải có:

- **OpenRuntime.efi**

- **OpenHfsPlus.efi** hoặc **HfsPlus.efi**

Để có thể dùng được các theme OC thì cũng cần thêm driver: **OpenCanopy.efi**
Và nếu muốn chụp ảnh màn hình thì cần thêm: **CrScreenshotDxe.efi**

## OC Theme

### Không dùng theme

![](https://image.3001.net/images/20210918/16319532063208.png) 

### Có dùng theme

![](https://image.3001.net/images/20210917/16318842917381.png)

Một số nguồn để download theme：

- https://github.com/chris1111/My-Simple-OC-Themes
- https://dortania.github.io/OpenCanopy-Gallery/blackosx.html
- https://github.com/LuckyCrack/OpenCore-Themes

Chỉnh sửa theme cũng khá đơn giản，chỉ là thay các icon dạng icns，thay background,là có theme mới theo ý：

![](https://image.3001.net/images/20220227/16459585249452.png) 
