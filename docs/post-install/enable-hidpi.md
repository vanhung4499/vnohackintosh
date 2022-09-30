---
title: Kích hoạt HiDPI
---

## HiDPI là gì?

Nói một cách đơn giản, HiDPI là công nghệ hiển thị mà Apple đang sử dụng, cải thiện độ rõ nét bằng cách tổng hợp nhiều pixel thành một pixel (tỉ lệ 2:1, tức 4 pixel gộp làm 1), khi màn hình đạt tiêu chuẩn retina do Apple xác định, nó sẽ tự động bật HiDPi:
+ Tất cả các dòng Macbook Pro đều có HiDPi
+ Nếu bạn có màn hình 4K, HiDPI cũng được bật theo mặc định. 
+ Trên một số laptop có màn 4K (DELL XPS, ...), HiDPI cũng được bật tự động.

Do gộp pixel, HiDPI sẽ trông rõ ràng hơn so với ban đầu, nhưng độ phân giải thực tế sẽ thấp hơn, tương đương với việc hy sinh độ phân giải để có độ rõ nét. Do đó, nếu HiDPi được bật trên màn hình 1080P, hiệu ứng hiển thị cuối cùng sẽ là gần với 720P. Theo lý thuyết như vậy, các màn hình có độ phân giải 2K phù hợp với HiDPI nhất, với màn 1080P không cần thiết phải bật nếu bạn không thấy chữ quá nhỏ!

So sánh một cách trực quan:
+ Không HiDPI
  ![](/img/docs/post-install/atm-no-hidpi.png)

+ Bật HiDPI
  ![](/img/docs/post-install/atm-hidpi.png)

## Kích hoạt HiDPI

Trên thực tế kích hoạt HiDPI rất dễ dàng với tool [one-key-hidpi](https://github.com/xzhih/one-key-hidpi) của tác giả [xzhih](https://github.com/xzhih). Hướng dẫn cũng được viết kĩ trong repo.

Chỉ cần một câu lệnh sau trong **Terminal**:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/xzhih/one-key-hidpi/master/hidpi.sh)"
```

![](/img/docs/post-install/one-key-hidpi.jpeg)

Các bước thực hiện:
1. Enable/Disable HIDPI
   + Thường chọn 1, chọn 3 nếu muốn bỏ hidpi
2. Chọn icon cho màn hình
   + Thường laptop chọn 3, pc chọn 1
3. Chọn các độ phân giải
   + Sẽ có các lựa chọn theo độ phân giản màn hình, tự chọn cho đúng!
   + Nếu không có độ phân giải như màn của bạn, bạn phải tự tính toán
     + VD: **1920x1080 1600x900 1336x768 1280x720**

Sau khi chạy script xong, khởi động lại máy, lúc này logo sẽ to hơn bình thường, bạn không cần lo lắng, vào lại mac sẽ chỉnh lại được!

Mở **System Preferences** -> **Displays** -> Chọn **Scaled** -> chọn kích cỡ mà bạn mong muốn

![](/img/docs/post-install/sp-displays.png)

Nếu không hiển thị như trên mà thay vào đó là một danh sách các độ phân giải thì hãy chọn các mục có đuôi (HiDPI).

Ngoài ra bạn cũng có thể dùng [`RDM`](https://github.com/usr-sse2/RDM/releases) để chỉnh độ phân giải:

![](/img/docs/post-install/rdm.png)

## Nhược điểm của HiDPI

Như tôi đã giải thích trên, HiDPI là gộp điểm ảnh lại để nét hơn, không gian làm việc sẽ bị nhỏ lại. Ngoài ra nó còn tăng gánh nặng cho GPU. Vì sao lại vậy, hãy xem ảnh sau:

![](/img/docs/post-install/si-gr-dp.png)

+ Bạn sẽ thấy **Resolution: 5120x2880 (5K/UHD+)**, tức là GPU đang thực sự phải xuất ra 5K
+ Còn **UI Looks Like: 2560x1440 (2K/QHD)** là độ phân giải thực sau khi gộp pixel (tỉ lệ 2:1). 

Do đó nếu bạn dùng iGPU mà còn chơi HiDPI thì có thể sẽ gặp tình trạng lag hơn khi không có hidpi. Đa số laptop chỉ có màn FHD trở xuống nên nếu không muốn không gian bị nhỏ lại đừng chọn bật HiDPI, còn muốn chữ to ra và mịn hơn thì hãy bật. Laptop của tôi màn 2K, bật HiDPI dùng về HD+ khá đẹp! Còn nếu bạn có card rời bạn muốn làm gì chả được!