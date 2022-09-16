---
title: Setup BIOS cho Hackintosh
---

## Setup chung cho tất cả

### Disable

* Fast Boot
* Secure Boot
* Serial/COM Port
* Parallel Port
* VT-d
* Compatibility Support Module (CSM)
* Thunderbolt
* Intel SGX
* Intel Platform Trust
* CFG Lock (MSR 0xE2 write protection)

### Enable

* VT-x
* Above 4G Decoding
* Hyper-Threading
* Execute Disable Bit
* EHCI/XHCI Hand-off
* OS type: Other OS
* DVMT Pre-Allocated(iGPU Memory): 64MB hoặc cao hơn
* SATA Mode: AHCI

:::info
Không phải mainboard nào cũng sẽ tìm thấy tất cả những tuỳ chọn này, thấy cái nào thì chỉnh cái đó, không thấy thì bỏ qua!
:::

## Setup theo một số hãng