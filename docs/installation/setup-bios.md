---
title: Setup BIOS cho Hackintosh
---

## Phím tắt BIOS và Boot Options của các hãng

| Hãng      |   BIOS    | Boot Options |
| --------- | :-------: | :----------: |
| Gigabyte  |  Delete   |     F12      |
| ASUS      | Delete/F2 |    F8/ESC    |
| ASRock    |  Delete   |     F11      |
| MSI       |  Delete   |     F11      |
| DELL      |    F2     |     F12      |
| Acer      | Delete/F2 |     F12      |
| Lenovo    |    F2     |     F12      |
| HP        |    F10    |      F9      |
| Intel NUC |    F2     |     F10      |

## Setup chung cho tất cả

:::info
Không phải mainboard nào cũng sẽ tìm thấy tất cả những tuỳ chọn này, thấy cái nào thì chỉnh cái đó, không thấy thì bỏ qua!
:::

### Disable

- Fast Boot
- Secure Boot
- Serial/COM Port
- Parallel Port
- VT-d
- Compatibility Support Module (CSM)
- Thunderbolt
- Intel SGX
- Intel Platform Trust
- CFG Lock (MSR 0xE2 write protection)

### Enable

- VT-x
- Above 4G Decoding
- Hyper-Threading
- Execute Disable Bit
- EHCI/XHCI Hand-off
- OS type: Other OS
- DVMT Pre-Allocated(iGPU Memory): 64MB hoặc cao hơn
- SATA Mode: AHCI

## Setup BIOS PC chi tiết theo một số hãng

:::info
Cần lưu ý phần cấu hình cho card đồ hoạ, sẽ có 3 trường hợp:

- Chỉ dùng card rời: (smbios `iMacPro1,1/MacPro7,1`)
  - Chỉnh card xuất hình là card rời, tắt card onboard đi
- Chỉ dùng card onboard: (smbios `iMac/MacMini`)
  - Chỉnh card xuất hình là card onboard
- Dùng cả 2 (dgpu + igpu headless): (smbios `iMac`)
  - Chỉnh card xuất hình là card rời nhưng vẫn phải bật card onboard
:::

:::tip
Trong hướng dẫn tôi sẽ mặc định setup bật cả 2 card onboard và card rời. Dựa vào cấu hình mà bạn chọn từ trước, bạn bật tắt card on hay điều chỉnh card xuất hình cho phù hợp! Việc chọn sai card xuất có thể dẫn tới không xuất hình ảnh ra được phải đổi cổng hoặc reset bios!
:::

### Gigabyte

:::info
Các mainboard 300 series trở lên của Gigabyte hãy update BIOS mới nhất để có thể mở khoá tính năng `CFG-Lock`! Các mainboard cũ hơn chấp nhận không disable được CFG-Lock trong BIOS nhưng không sao không ảnh hưởng quá nhiều!
:::

- **Save & Exit**
  - Load Optimized Defaults

- **Favorites (F11)**
  - Extreme Memory Profile(X.M.P.) → **Profile 1**
  - VT-d → **Disabled**

- **Settings**
  - **IO Ports**
    - Initial Display Output → **PCIe 1 Slot** (Chọn card xuất hình)
    - Internal Graphics → **Enabled** (card onboard)
    - DVMT Pre-Allocated → **64M**
    - DVMT Total-Gfx Mem → **MAX**
    - Aperture Size → **256M**
    - Above 4G Decoding → **Enabled**
  - Resize BAR Support → **Disabled**
  - Super IO Configuration
    - Serial Port → **Disabled**
  - USB Configuration
    - XHCI Hand-off → **Enabled**
  - Network Stack Configuration
    - Network Stack → **Disabled**
  - **Miscellaneous**
    - Intel Platform Trust Technology(PTT) → **Disabled**
    - Software Guard Extensions(SGX) → **Disabled**

- **Boot**
  - CFG Lock → **Disabled**
  - Boot Option #1 → **UEFI USB**
  - Fast Boot → **Disabled**
  - Windows 8/10 Features → **Other OS**
  - CSM Support → **Disable**
  - Secure Boot → **Disabled**

:::info

- Để chọn card onboard mặc định:
  - Initial Display Output → **IGFX**
- Để tắt card onboard (chỉ dùng card rời):
  - Internal Graphics → **Disabled**
:::

### ASUS

:::info
Mặc BIOS ASUS chạy ở chế độ **EZ Mode**, bấm `F7` để chuyển qua **Advanced Mode**
:::

- **Exit**
  - Load Optimized Defaults → **Yes**

- **Advanced:**
  - CPU Configuration:
    - CPU-Power Management Control:
      - CFG Lock → **Disabled**
  - System Agent (SA) Configuration
    - VT-d → **Disabled**
    - Above 4G Decoding → **Enabled**
    - Graphics Configuration:
      - Primary Display → **PCIE** (Chọn card xuất hình)
      - iGPU Multi-Monitor → **Enabled** (card onboard)
      - DVMT Pre-Allocated → **64MB**
  - PCH Storage Configuration
    - SATA Mode Selection → **AHCI**
  - Onboard Devices Configuration
    - Serial Port Configuration
      - Serial Port → **Off**
  - USB Configuration
    - XHCI Hand-off → **Enabled**
  - Network Stack Configuration
    - Network Stack → **Disabled**

- **Boot:**
  - Boot Configuration
    - Fast Boot → **Disabled**
  - CSM (Compatibility Support Module)
    - Launch CSM → **Disabled**
  - Secure Boot
    - OS Type → **Other OS**
  - Boot Option #1 → **UEFI USB**

:::info

- Để chọn card onboard mặc định:
  - Primary Display → **Onboard Graphic**
- Để tắt card onboard (chỉ dùng card rời):
  - iGPU Multi-Monitor → **Disabled**
:::

### ASRock

:::info
Mặc BIOS ASRock chạy ở chế độ **EZ Mode**, bấm `F6` để chuyển qua **Advanced Mode**
:::

- **Exit**
  - **Load Optimized Defaults** → Yes

- **OC Tweaker**
  - DRAM Configuration
    - Load XMP Setting → **Enabled**
- **Advanced**-  - CPU Configuration
  - CFG Lock → **Disabled**
  - Chipset Configuration
    - Primary Graphics Adapter → **PCIE**
    - Above 4G Decoding → **Enabled**
    - C.A.M (Clever Access Memory) → **Disabled**
    - VT-d → **Disabled**
  - Storage Configuration
    - SATA Mode Selection → **AHCI**
  - USB Configuration
    - XHCI Hand-off → **Enabled**
  - Trusted Computing
    - Security Device Support → **Disabled**

- **Security**
  - Secure Boot
    - Secure Boot → **Disabled**

- **Boot**
  - Fast Boot → Disabled
  - Boot Option #1 → **UEFI USB**

### MSI

:::info
Mặc BIOS MSI chạy ở chế độ **EZ Mode**, bấm `F7` để chuyển qua **Advanced Mode**
:::

- **Save & Exit**
  - Restore Defaults → **Yes**

- **Settings**
  - **Advanced**
    - PCI sub-system Settings
      - Above 4G memory/Crypto Currentcy mining → **Enabled**
    - Integrated Peripherals
      - SATA Configuration
        - SATA Mode → **AHCI Mode**
    - Intergrated Graphics Configuration
      - Integrated Grahics Adapter → **PEG** (Card xuất hình)
      - Integrated Grahics Share Memory → **64MB**
      - IGD Multi-Monitor → **Enabled** (Card onboard)
    - USB Configuration
      - XHCI Hand-off → **Enabled**
    - Super IO settings
      - Serial(COM) Port 0 Configuration
        - Serial Port: **Disabled**
    - Windows OS Configuration
      - MSI Fast boot → **Disabled**
      - Fast Boot → **Disabled**
  - **Boot**
    - Boot Option #1 → **UEFI USB Key: USB**

- **OC (Overclocking)**
  - Extreme Memory Profile(X.M.P) → **Enabled**
  - CPU Features
    - Intel VT-D Tech → **Disabled**
    - CFG Lock → **Disabled**

:::info

- Để chọn card onboard mặc định:
  - Integrated Grahics Adapter → **IGD**
- Để tắt card onboard (chỉ dùng card rời):
  - IGD Multi-Monitor → **Disabled**
:::
