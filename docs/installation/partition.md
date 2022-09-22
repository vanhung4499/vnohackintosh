---
title: Hướng dẫn phân vùng ổ cứng
---

:::info
Phần này tôi sẽ hướng dẫn các bạn chia ổ cứng thế nào cho hợp lý để cài macOS và có thể dual/tripple boot!
:::

:::tip
Với kinh nghiệm cá nhân thì bạn phải chia cho vùng mac ít nhất **100GB**! Đã có rất nhiều lần tôi phải xử lý tăng kích thước vùng mac cho khách hàng vì ban đầu chia quá ít! Không phải lúc nào cũng có thể tăng được, nhiều lần tôi phải clone hẳn qua một vùng mới, xử lý rất phiền phức!
:::

## Bài toán phân vùng?

Tôi đang hướng dẫn bạn cài thêm macOS và giữ nguyên Windows. Theo kinh nghiệm của tôi, sẽ có 3 trường hợp sau xảy ra:

### Cài macOS vào ổ cứng riêng

![partition-case-1.png](/img/docs/installation/partition-case-1.png)

Trường hợp đơn giản nhất, chả cần làm gì, chỉ cần vào bộ cài mac và xoá nguyên ổ cứng đó cho mac.

### Cài macOS vào một phân vùng trên ổ cứng không chứa Windows

![partition-case-2.png](/img/docs/installation/partition-case-2.png)

Trường hợp này khá khó xử lý, vì thường bạn sẽ không có phân vùng EFI (ESP) trên ổ cứng này

Hướng giải quyết là phải chia ra một phân vùng EFI >= 200MB, format FAT32 và đổi partition type id thành EFI. Sử dụng Minitool Partition Wizzard (bản trả phí hoặc crack) để làm điều này.

### Cài macOS trên cùng ổ cứng chứa Windows

![partition-case-3.png](/img/docs/installation/partition-case-3.png)

Trường hợp này có vẻ dễ xử lý hơn, nhưng thông thường phân vùng EFI được tạo khi cài Windows thường chỉ là 100MB nhưng để cài macOS thì cần ít nhất 200MB.

Có 2 cách giải quyết:

+ Tăng kích thước vùng EFI bằng cách xoá phân vùng Recovery và gộp vào (Thông thường Recovery sẽ nằm cạnh EFI)
+ Tạo một phân vùng EFI mới như trường hợp phía trên

Minitool Partition Wizzard xin hân hạnh tài trợ cho giải pháp này!

Hướng dẫn sử dụng Minitool Partition Wizzard xin vui lòng **tham khảo kĩ** bài viết sau: [Cách tạo phân vùng boot EFI, MSR và Recovery cho chuẩn UEFI/GPT
](https://blogchiasekienthuc.com/thu-thuat-may-tinh/cach-tao-phan-vung-boot-efi-msr-va-recovery.html)

:::tip
Hãy đặt tên phân vùng để cài mac cho dễ phân biệt với các phân vùng khác để tránh xoá nhầm trong lúc cài đặt. Tôi thường để là **MAC**, **Hackintosh**, **Macintosh HD**.
:::

:::danger
Luôn luôn backup dữ liệu của bạn, vì việc phân chia ổ cứng này bạn sẽ có thể lỡ tay xoá luôn dữ liệu. Tôi không chịu trách nhiệm cho sự bất cẩn của bạn!
:::
