/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: {
    "Introdution": ["introduction"],
    "Basic Knowlegde": [
      "basic-knowledge/prerequisites",
      "basic-knowledge/limits",
      "basic-knowledge/installation-process",
      "basic-knowledge/find-hardware",
      "basic-knowledge/terminology",
      // "basic-knowledge/opencore-vs-clover"
    ],
    "USB Creation": [
      "usb-creation/download-files",
      "usb-creation/create-usb-installer",
      "usb-creation/basic-opencore",
      "usb-creation/basic-acpi",
      "usb-creation/basic-kext",
      "usb-creation/basic-driver",
    ],
    "OpenCore Config": [
      "opencore-config/intro",
      "opencore-config/acpi",
      "opencore-config/booter",
      "opencore-config/device-properties",
      "opencore-config/kernel",
      "opencore-config/misc",
      "opencore-config/nvram",
      "opencore-config/platform-info",
      "opencore-config/uefi",
    ], 
    "Installation": [
      "installation/setup-bios",
      "installation/partition",
      "installation/install-macos",
    ],
    "Post Install": [
      "post-install/booting-without-usb",
      "post-install/fixing-audio",
      "post-install/igpu-patching",
      "post-install/fixing-power-management",
      "post-install/fixing-battery",
      "post-install/fixing-iservices",
      "post-install/fixing-wifi",
      "post-install/usb-mapping",
      "post-install/fixing-sleep",
      "post-install/enable-hidpi",
      "post-install/backup",
      "post-install/update-ota",
    ],
    "ACPI Patching": [
      "acpi-patching/overview",
      "acpi-patching/adding-missing-devices",
      "acpi-patching/disabling-unsupported-dgpu",
      "acpi-patching/fixing-brightness-keys",
      "acpi-patching/enable-i2c-trackpad",
      "acpi-patching/fixing-battery-percent",
      "acpi-patching/fixing-sleep-wake",
    ]
  }

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
