export const users = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    phoneNumber: "+27821234567",
    displayName: "Amina Dlamini",
    emailAddress: "amina@example.com",
    role: "tenant",
    city: "Johannesburg",
    verificationStatus: "verified",
    ratingAverage: 4.8,
    ratingCount: 18,
    rewardPoints: 2450
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    phoneNumber: "+27835550123",
    displayName: "Kopano Homes",
    emailAddress: "kopano@example.com",
    role: "landlord",
    city: "Johannesburg",
    verificationStatus: "verified",
    ratingAverage: 4.7,
    ratingCount: 86,
    rewardPoints: 0
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    phoneNumber: "+2348015550101",
    displayName: "Lagos Flex Work",
    emailAddress: "lagos@example.com",
    role: "host",
    city: "Lagos",
    verificationStatus: "verified",
    ratingAverage: 4.6,
    ratingCount: 42,
    rewardPoints: 0
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    phoneNumber: "+27110888000",
    displayName: "AFHCO Property Management",
    emailAddress: "leasing@example.com",
    role: "landlord",
    city: "Johannesburg",
    verificationStatus: "verified",
    ratingAverage: 4.5,
    ratingCount: 325,
    rewardPoints: 0
  },

  {
    id: "66666666-6666-6666-6666-666666666666",
    phoneNumber: "+27825550111",
    displayName: "Sarah Mokoena",
    emailAddress: "sarah.agent@example.com",
    role: "agent",
    city: "Johannesburg",
    verificationStatus: "verified",
    ratingAverage: 4.9,
    ratingCount: 74,
    rewardPoints: 0,
    responseTime: "2 hours"
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    phoneNumber: "+27119990000",
    displayName: "Listing Ops",
    emailAddress: "ops@listing.properties",
    role: "admin",
    city: "Johannesburg",
    verificationStatus: "verified",
    ratingAverage: 0,
    ratingCount: 0,
    rewardPoints: 0
  }
];


export const agencies = [
  {
    id: "agency-demo-1",
    agencyName: "Jozi Prime Letting",
    registrationNumber: "EAAB-DEMO-001",
    verified: true,
    city: "Johannesburg"
  }
];

export const propertyAssignments = [
  {
    propertyId: "afhco-1780539",
    assignedUserId: "66666666-6666-6666-6666-666666666666",
    role: "listing_agent",
    note: "Handles tenant enquiries and application follow-ups."
  },
  {
    propertyId: "afhco-1780539",
    assignedUserId: "66666666-6666-6666-6666-666666666666",
    role: "viewing_agent",
    note: "Confirms viewing slots and access instructions."
  },
  {
    propertyId: "afhco-1780540",
    assignedUserId: "66666666-6666-6666-6666-666666666666",
    role: "lease_manager",
    note: "Prepares lease documents after landlord approval."
  }
];

export const listings = [
  {
    "id": "afhco-1780539",
    "managedByType": "agent",
    "agencyId": "agency-demo-1",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Wilgeheuwel",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R12,600 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Roodepoort",
    "suburb": "Wilgeheuwel",
    "address": "211 The Falls Lifestyle Estate, 0B Van Staden Road, Wilgeheuwel, Roodepoort",
    "latitude": -26.10196,
    "longitude": 27.8839,
    "priceAmount": 12600,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.9,
    "reviewCount": 44,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_520f3295805246d2bed3a9114cc02558_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_520f3295805246d2bed3a9114cc02558_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_520f3295805246d2bed3a9114cc02558_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_520f3295805246d2bed3a9114cc02558_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_520f3295805246d2bed3a9114cc02558_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_ecdb95fd56164536997d743fab852263_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_ecdb95fd56164536997d743fab852263_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_ecdb95fd56164536997d743fab852263_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_fb0b163b18cd49749ad5599fa69e01b3_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_fb0b163b18cd49749ad5599fa69e01b3_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_fb0b163b18cd49749ad5599fa69e01b3_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_8355085b78124453b46edb1b53f6dbac_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_8355085b78124453b46edb1b53f6dbac_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_8355085b78124453b46edb1b53f6dbac_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7a161393c641488f83c3ddab0edc63a3_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7a161393c641488f83c3ddab0edc63a3_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7a161393c641488f83c3ddab0edc63a3_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7cf3195f74c04db2810f0d06bdbc2de0_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7cf3195f74c04db2810f0d06bdbc2de0_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7cf3195f74c04db2810f0d06bdbc2de0_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_05a567f967d04474bb51faf4c37856df_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_05a567f967d04474bb51faf4c37856df_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_05a567f967d04474bb51faf4c37856df_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_03e5d0f86a974c99959d4a989da91416_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_03e5d0f86a974c99959d4a989da91416_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_03e5d0f86a974c99959d4a989da91416_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_a117f0e85e674a90a11ec2e0d19e2bab_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_a117f0e85e674a90a11ec2e0d19e2bab_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_a117f0e85e674a90a11ec2e0d19e2bab_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_77276781967e485f86980d24e30e0fd4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_77276781967e485f86980d24e30e0fd4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_77276781967e485f86980d24e30e0fd4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_478476b190a540249001e594afd6610e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_478476b190a540249001e594afd6610e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_478476b190a540249001e594afd6610e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_ca5b5e0dbc3b4e859c57ebf3e3a142a3_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_ca5b5e0dbc3b4e859c57ebf3e3a142a3_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_ca5b5e0dbc3b4e859c57ebf3e3a142a3_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/roodepoort/wilgeheuwel/apartment/1780539/211-the-falls-lifestyle-estate-0b-van-staden-road/"
  },
  {
    "id": "afhco-1780540",
    "managedByType": "agent",
    "agencyId": "agency-demo-1",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Wilgeheuwel",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,850 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Roodepoort",
    "suburb": "Wilgeheuwel",
    "address": "333 The Falls Lifestyle Estate, 0B Van Staden Road, Wilgeheuwel, Roodepoort",
    "latitude": -26.10198,
    "longitude": 27.8839,
    "priceAmount": 10850,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.9,
    "reviewCount": 42,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_3d82c1e9de934d798295bf3c54c64458_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_3d82c1e9de934d798295bf3c54c64458_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_3d82c1e9de934d798295bf3c54c64458_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_3d82c1e9de934d798295bf3c54c64458_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_3d82c1e9de934d798295bf3c54c64458_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_cf78a06b17a64156bbb49b1b63926fef_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_cf78a06b17a64156bbb49b1b63926fef_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_cf78a06b17a64156bbb49b1b63926fef_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_d092b68b8e6e4ab7b027d3b879f63800_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_d092b68b8e6e4ab7b027d3b879f63800_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_d092b68b8e6e4ab7b027d3b879f63800_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_44907694b75a48b5bdbf637c03756195_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_44907694b75a48b5bdbf637c03756195_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_44907694b75a48b5bdbf637c03756195_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_e3bd777573f040d5bef50aa2ef85da3c_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_e3bd777573f040d5bef50aa2ef85da3c_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_e3bd777573f040d5bef50aa2ef85da3c_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_85ca28c6d6a84c34bb067ee0d9cfeec5_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_85ca28c6d6a84c34bb067ee0d9cfeec5_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_85ca28c6d6a84c34bb067ee0d9cfeec5_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_bfae0275da1940f49254a214eb12c6a3_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_bfae0275da1940f49254a214eb12c6a3_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_bfae0275da1940f49254a214eb12c6a3_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_61707e80eeb64e0b936302f3a9d48fc6_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_61707e80eeb64e0b936302f3a9d48fc6_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_61707e80eeb64e0b936302f3a9d48fc6_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_4c503b52d6b04ea2bfc8af2e8873c875_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_4c503b52d6b04ea2bfc8af2e8873c875_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_4c503b52d6b04ea2bfc8af2e8873c875_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7af90f2693fa43d5b3a083e174b45edd_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7af90f2693fa43d5b3a083e174b45edd_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7af90f2693fa43d5b3a083e174b45edd_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7bd168b1746a4e1ca154f8a104d1f4a1_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7bd168b1746a4e1ca154f8a104d1f4a1_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_7bd168b1746a4e1ca154f8a104d1f4a1_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_4627436125074ecdb020987c74d9bc6b_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_4627436125074ecdb020987c74d9bc6b_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/10/688_4627436125074ecdb020987c74d9bc6b_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/roodepoort/wilgeheuwel/apartment/1780540/333-the-falls-lifestyle-estate-0b-van-staden-road/"
  },
  {
    "id": "afhco-3139629",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Riversands",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,700 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Midrand",
    "suburb": "Riversands",
    "address": "45-1D The Parks Lifestyle Apartments, 22 Riversands Boulevard, Riversands, Midrand",
    "priceAmount": 10700,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.8,
    "reviewCount": 40,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7b53eb3eb7484f5689542ab444236b25_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7b53eb3eb7484f5689542ab444236b25_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7b53eb3eb7484f5689542ab444236b25_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7b53eb3eb7484f5689542ab444236b25_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7b53eb3eb7484f5689542ab444236b25_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_57b6ba56a8874a6cae38d8439de3767b_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_57b6ba56a8874a6cae38d8439de3767b_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_57b6ba56a8874a6cae38d8439de3767b_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e66d46ca8eba4864bc6be4ec55d1c046_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e66d46ca8eba4864bc6be4ec55d1c046_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e66d46ca8eba4864bc6be4ec55d1c046_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_91d1efeadcb3459bbce6aa16d92e1016_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_91d1efeadcb3459bbce6aa16d92e1016_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_91d1efeadcb3459bbce6aa16d92e1016_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b84e39690dac4d7280bfc2c3b24ac5d4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b84e39690dac4d7280bfc2c3b24ac5d4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b84e39690dac4d7280bfc2c3b24ac5d4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3aaf3270277b4492a04040d6fe28ffef_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3aaf3270277b4492a04040d6fe28ffef_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3aaf3270277b4492a04040d6fe28ffef_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b83e98efd55d483b8e61ae2d7d8fdcfe_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b83e98efd55d483b8e61ae2d7d8fdcfe_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b83e98efd55d483b8e61ae2d7d8fdcfe_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_6d5efd0dc7f243738d7f73860cd59b33_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_6d5efd0dc7f243738d7f73860cd59b33_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_6d5efd0dc7f243738d7f73860cd59b33_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d007dbdf0df94d63ba9a124c31197450_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d007dbdf0df94d63ba9a124c31197450_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d007dbdf0df94d63ba9a124c31197450_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_02f2c4698a894039906a5d3869daa118_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_02f2c4698a894039906a5d3869daa118_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_02f2c4698a894039906a5d3869daa118_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_18e9b938fc494ae0b539e3b3fd83ade9_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_18e9b938fc494ae0b539e3b3fd83ade9_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_18e9b938fc494ae0b539e3b3fd83ade9_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4548a47d5365498cb0df68735376d5a8_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4548a47d5365498cb0df68735376d5a8_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4548a47d5365498cb0df68735376d5a8_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_261fb6515d6147ada0b7c20d6c0a2480_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_261fb6515d6147ada0b7c20d6c0a2480_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_261fb6515d6147ada0b7c20d6c0a2480_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8f74480ed7244116830e04142b68d360_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8f74480ed7244116830e04142b68d360_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8f74480ed7244116830e04142b68d360_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e880754584e5495e80a0a5440040dc39_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e880754584e5495e80a0a5440040dc39_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e880754584e5495e80a0a5440040dc39_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7599d067dade4790bbef6aac32c716ad_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7599d067dade4790bbef6aac32c716ad_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_7599d067dade4790bbef6aac32c716ad_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d2447264f4e3458bb4cff877fdf312ee_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d2447264f4e3458bb4cff877fdf312ee_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d2447264f4e3458bb4cff877fdf312ee_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e7c65ccbcf0b4debb2706532d906a154_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e7c65ccbcf0b4debb2706532d906a154_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e7c65ccbcf0b4debb2706532d906a154_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_17b87957404447959dd427a7310406f2_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_17b87957404447959dd427a7310406f2_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_17b87957404447959dd427a7310406f2_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_2583eaf34e1d4c98ada1cce9847768f4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_2583eaf34e1d4c98ada1cce9847768f4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_2583eaf34e1d4c98ada1cce9847768f4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_687498f873ea4887ad9e568ae386a716_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_687498f873ea4887ad9e568ae386a716_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_687498f873ea4887ad9e568ae386a716_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_21e533c6211c4321bf5e16c4babfcf35_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_21e533c6211c4321bf5e16c4babfcf35_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_21e533c6211c4321bf5e16c4babfcf35_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_958541965b5146e9aac2497aefe8c348_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_958541965b5146e9aac2497aefe8c348_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_958541965b5146e9aac2497aefe8c348_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_49dff60b5cf04c6eb354282d9e2fc086_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_49dff60b5cf04c6eb354282d9e2fc086_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_49dff60b5cf04c6eb354282d9e2fc086_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0bd6bc1599dd4065b54b46670479ea7d_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0bd6bc1599dd4065b54b46670479ea7d_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0bd6bc1599dd4065b54b46670479ea7d_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4ab89fe3f8d544ae8e3370944fa2d9b1_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4ab89fe3f8d544ae8e3370944fa2d9b1_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4ab89fe3f8d544ae8e3370944fa2d9b1_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_641b96ca263944bfb966173a6eb358d5_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_641b96ca263944bfb966173a6eb358d5_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_641b96ca263944bfb966173a6eb358d5_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle apartments",
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/midrand/riversands/apartment/3139629/45-1d-the-parks-lifestyle-apartments-22-riversands-boulevard/"
  },
  {
    "id": "afhco-3166471",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "4 Bedroom Apartment To Let in Bramley",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 4 bedroom monthly apartment is listed at R10,600 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Johannesburg",
    "suburb": "Bramley",
    "address": "10A Hollyland, 21 Andries Street, Bramley, Johannesburg",
    "priceAmount": 10600,
    "priceUnit": "month",
    "bedrooms": 4,
    "bathrooms": 2,
    "capacity": 8,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.8,
    "reviewCount": 38,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0c93d6e62a994f30b60864b862c22f48_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0c93d6e62a994f30b60864b862c22f48_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0c93d6e62a994f30b60864b862c22f48_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0c93d6e62a994f30b60864b862c22f48_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0c93d6e62a994f30b60864b862c22f48_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_2acea38559a24fa19a9458bca2834182_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_2acea38559a24fa19a9458bca2834182_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_2acea38559a24fa19a9458bca2834182_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3952303a665e4625a4bf4ab977f9b7e8_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3952303a665e4625a4bf4ab977f9b7e8_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3952303a665e4625a4bf4ab977f9b7e8_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_37b8c28b175b49cc9e9ce13850f863d6_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_37b8c28b175b49cc9e9ce13850f863d6_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_37b8c28b175b49cc9e9ce13850f863d6_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_6bf1a6d3646a4e9fb7029787e4d6dba1_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_6bf1a6d3646a4e9fb7029787e4d6dba1_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_6bf1a6d3646a4e9fb7029787e4d6dba1_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_4da7ea94f7be4195a9698df4c867029a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_4da7ea94f7be4195a9698df4c867029a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_4da7ea94f7be4195a9698df4c867029a_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_bf40846d156045a0996618716451a86f_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_bf40846d156045a0996618716451a86f_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_bf40846d156045a0996618716451a86f_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_393edfdfcf3a4793a15d4d76ee5a2424_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_393edfdfcf3a4793a15d4d76ee5a2424_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_393edfdfcf3a4793a15d4d76ee5a2424_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_79c90cc0585b43aa831fea22811c15a8_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_79c90cc0585b43aa831fea22811c15a8_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_79c90cc0585b43aa831fea22811c15a8_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_f0f84e9a15c84b98bde97a217be6f364_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_f0f84e9a15c84b98bde97a217be6f364_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_f0f84e9a15c84b98bde97a217be6f364_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_9ad8c326255e4f3fad04eed5356ccf72_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_9ad8c326255e4f3fad04eed5356ccf72_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_9ad8c326255e4f3fad04eed5356ccf72_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_7886f80402d142f19573a17134d50ef0_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_7886f80402d142f19573a17134d50ef0_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_7886f80402d142f19573a17134d50ef0_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_2b3bca3550ea447a85a49dbdd8afe554_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_2b3bca3550ea447a85a49dbdd8afe554_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_2b3bca3550ea447a85a49dbdd8afe554_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3fa1c1bcd4444d21bc1ad22c3a8521bf_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3fa1c1bcd4444d21bc1ad22c3a8521bf_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3fa1c1bcd4444d21bc1ad22c3a8521bf_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_92fa4f893aeb445380dc4fa81dd7e76b_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_92fa4f893aeb445380dc4fa81dd7e76b_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_92fa4f893aeb445380dc4fa81dd7e76b_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_912ff0b5ed4c41559c8b8e684ccee6a0_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_912ff0b5ed4c41559c8b8e684ccee6a0_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_912ff0b5ed4c41559c8b8e684ccee6a0_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_1f01349f7de24c2d8f3b39b8e9b6cb59_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_1f01349f7de24c2d8f3b39b8e9b6cb59_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_1f01349f7de24c2d8f3b39b8e9b6cb59_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3552926414404c93b1c183e9574c4e44_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3552926414404c93b1c183e9574c4e44_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3552926414404c93b1c183e9574c4e44_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_b5ccfbc3998a4a8e8fca5ff17d4c69ae_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_b5ccfbc3998a4a8e8fca5ff17d4c69ae_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_b5ccfbc3998a4a8e8fca5ff17d4c69ae_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_99d9aad821b840b3b536e4a713d315e7_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_99d9aad821b840b3b536e4a713d315e7_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_99d9aad821b840b3b536e4a713d315e7_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_48b683416da0471195c4a619838c08a7_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_48b683416da0471195c4a619838c08a7_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_48b683416da0471195c4a619838c08a7_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_b59c1404d7994de8b6d543f725048b6d_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_b59c1404d7994de8b6d543f725048b6d_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_b59c1404d7994de8b6d543f725048b6d_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_759911f7fc36441e8ea2a3c9e08ed87f_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_759911f7fc36441e8ea2a3c9e08ed87f_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_759911f7fc36441e8ea2a3c9e08ed87f_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3a949700639c4ef08b901726ba60bd0d_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3a949700639c4ef08b901726ba60bd0d_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_3a949700639c4ef08b901726ba60bd0d_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_a84b01eb397244a6946d0c6c72ded0b6_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_a84b01eb397244a6946d0c6c72ded0b6_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_a84b01eb397244a6946d0c6c72ded0b6_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_207150a9102f4c60b0ea00da2d1c28a3_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_207150a9102f4c60b0ea00da2d1c28a3_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_207150a9102f4c60b0ea00da2d1c28a3_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_66e6481fb74a4a4ba819fd65c3aed754_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_66e6481fb74a4a4ba819fd65c3aed754_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_66e6481fb74a4a4ba819fd65c3aed754_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_e10d10510f6643a986debefd88a4356c_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_e10d10510f6643a986debefd88a4356c_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_e10d10510f6643a986debefd88a4356c_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_349e3a1296974284902db8688ecdb6ca_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_349e3a1296974284902db8688ecdb6ca_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_349e3a1296974284902db8688ecdb6ca_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_d3fb369184d648ce913e70c2a8892163_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_d3fb369184d648ce913e70c2a8892163_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_d3fb369184d648ce913e70c2a8892163_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0170c1df7cbe46f4b68dd81240ad1666_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0170c1df7cbe46f4b68dd81240ad1666_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/5/688_0170c1df7cbe46f4b68dd81240ad1666_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "4 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/johannesburg/bramley/apartment/3166471/10a-hollyland-21-andries-street/"
  },
  {
    "id": "afhco-3155679",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Riversands",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,300 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Midrand",
    "suburb": "Riversands",
    "address": "08-1H The Parks Lifestyle Apartments, 22 CENTURY BOULEVARD RIVERSANDS, Riversands, Midrand",
    "priceAmount": 10300,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.8,
    "reviewCount": 36,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0269c2f0dba846e4af5a85335817533e_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0269c2f0dba846e4af5a85335817533e_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0269c2f0dba846e4af5a85335817533e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0269c2f0dba846e4af5a85335817533e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0269c2f0dba846e4af5a85335817533e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1a604cee5b9444238a7846c1fc65776c_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1a604cee5b9444238a7846c1fc65776c_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1a604cee5b9444238a7846c1fc65776c_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ff95c3d219394921b1c389c4d628d765_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ff95c3d219394921b1c389c4d628d765_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ff95c3d219394921b1c389c4d628d765_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8e68b260a10b4c3f8724663a2bfd8ef4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8e68b260a10b4c3f8724663a2bfd8ef4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8e68b260a10b4c3f8724663a2bfd8ef4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_5509fdfa3f9543d49e2abbf7ea9b9604_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_5509fdfa3f9543d49e2abbf7ea9b9604_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_5509fdfa3f9543d49e2abbf7ea9b9604_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1526f1e916334785b91c045a77d6a388_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1526f1e916334785b91c045a77d6a388_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1526f1e916334785b91c045a77d6a388_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b2b87e98362e4cfaa1947c432a6993cb_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b2b87e98362e4cfaa1947c432a6993cb_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b2b87e98362e4cfaa1947c432a6993cb_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4099b3c617a54d2eb402424e3d773253_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4099b3c617a54d2eb402424e3d773253_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4099b3c617a54d2eb402424e3d773253_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ab2d17f95d584d31b2f8d9b141d50616_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ab2d17f95d584d31b2f8d9b141d50616_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ab2d17f95d584d31b2f8d9b141d50616_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e653a1f62b5d46658d58d42306e85ec1_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e653a1f62b5d46658d58d42306e85ec1_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e653a1f62b5d46658d58d42306e85ec1_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_bc487c3d22714d0e8ff912ac85d1312d_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_bc487c3d22714d0e8ff912ac85d1312d_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_bc487c3d22714d0e8ff912ac85d1312d_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_fa20a787878a42cc9be5541a9cea80d7_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_fa20a787878a42cc9be5541a9cea80d7_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_fa20a787878a42cc9be5541a9cea80d7_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle apartments",
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/midrand/riversands/apartment/3155679/08-1h-the-parks-lifestyle-apartments-22-century-boulevard-riversands/"
  },
  {
    "id": "afhco-3084992",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Wilgeheuwel",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,300 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Roodepoort",
    "suburb": "Wilgeheuwel",
    "address": "85 The Falls 2 Lifestyle Estate, 45 Shearwater Road, Wilgeheuwel, Roodepoort",
    "priceAmount": 10300,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.8,
    "reviewCount": 34,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_69e03711aeb84f89996122d342565671_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_69e03711aeb84f89996122d342565671_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_69e03711aeb84f89996122d342565671_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_69e03711aeb84f89996122d342565671_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_69e03711aeb84f89996122d342565671_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_980be00249124d1e8adfc29d2e05a263_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_980be00249124d1e8adfc29d2e05a263_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_980be00249124d1e8adfc29d2e05a263_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_f34290be3c3f4cd5a0385a6c820400ee_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_f34290be3c3f4cd5a0385a6c820400ee_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_f34290be3c3f4cd5a0385a6c820400ee_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_51af132b03694e8a8a827536b5fb4d2f_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_51af132b03694e8a8a827536b5fb4d2f_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_51af132b03694e8a8a827536b5fb4d2f_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_5869f920ddad460cb4e91e3dd1719dbe_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_5869f920ddad460cb4e91e3dd1719dbe_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_5869f920ddad460cb4e91e3dd1719dbe_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_c8f6975b2c244b85a9490e66f6431f57_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_c8f6975b2c244b85a9490e66f6431f57_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_c8f6975b2c244b85a9490e66f6431f57_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_20f94edd21394b9c9ec700ce79915791_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_20f94edd21394b9c9ec700ce79915791_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_20f94edd21394b9c9ec700ce79915791_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_f5d190aaed964b9b891047bfaf9b43a7_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_f5d190aaed964b9b891047bfaf9b43a7_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_f5d190aaed964b9b891047bfaf9b43a7_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_d8d51ede53ec47cba6fdf98484ee218e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_d8d51ede53ec47cba6fdf98484ee218e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_d8d51ede53ec47cba6fdf98484ee218e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_ffa84421c51242eda3ede4c170829a5a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_ffa84421c51242eda3ede4c170829a5a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_ffa84421c51242eda3ede4c170829a5a_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_680cd9bffb0c4a5f8350d73c471df686_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_680cd9bffb0c4a5f8350d73c471df686_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_680cd9bffb0c4a5f8350d73c471df686_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_e856449c5fb14cb69c7e2b5be254f7a6_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_e856449c5fb14cb69c7e2b5be254f7a6_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/2/688_e856449c5fb14cb69c7e2b5be254f7a6_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/roodepoort/wilgeheuwel/apartment/3084992/85-the-falls-2-lifestyle-estate-45-shearwater-road/"
  },
  {
    "id": "afhco-1833438",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Wilgeheuwel",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,300 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Roodepoort",
    "suburb": "Wilgeheuwel",
    "address": "86 The Falls 2 Lifestyle Estate, 45 Shearwater Road, Wilgeheuwel, Roodepoort",
    "priceAmount": 10300,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.7,
    "reviewCount": 32,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_e89c228d3eea423fa28edbfd60a29c2c_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_e89c228d3eea423fa28edbfd60a29c2c_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_e89c228d3eea423fa28edbfd60a29c2c_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_e89c228d3eea423fa28edbfd60a29c2c_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_e89c228d3eea423fa28edbfd60a29c2c_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_4a64620f67254ce29bcca90f962d16f4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_4a64620f67254ce29bcca90f962d16f4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_4a64620f67254ce29bcca90f962d16f4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_95ac5915e06a41e088fa1c868567a632_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_95ac5915e06a41e088fa1c868567a632_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_95ac5915e06a41e088fa1c868567a632_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_949f2249e4dd47859579ece5278249ba_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_949f2249e4dd47859579ece5278249ba_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_949f2249e4dd47859579ece5278249ba_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_48925206a530484284e5aa7525f1b217_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_48925206a530484284e5aa7525f1b217_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_48925206a530484284e5aa7525f1b217_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_8e4229a644764cb7bc273dbc74b9f320_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_8e4229a644764cb7bc273dbc74b9f320_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_8e4229a644764cb7bc273dbc74b9f320_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_89573eb5cace49c6b078290ecc974813_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_89573eb5cace49c6b078290ecc974813_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_89573eb5cace49c6b078290ecc974813_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_ee99ed5237ec4136a42083aa4857e29e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_ee99ed5237ec4136a42083aa4857e29e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_ee99ed5237ec4136a42083aa4857e29e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_b124ac50109b4f6584cdcd8b82a7b453_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_b124ac50109b4f6584cdcd8b82a7b453_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_b124ac50109b4f6584cdcd8b82a7b453_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a6d453694f6c421bb432f2e2796d06a6_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a6d453694f6c421bb432f2e2796d06a6_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a6d453694f6c421bb432f2e2796d06a6_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_4eb9870d11fb499aad5593dc228e805a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_4eb9870d11fb499aad5593dc228e805a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_4eb9870d11fb499aad5593dc228e805a_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_ba53dffe5a8c4b599a4094b322581b4a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_ba53dffe5a8c4b599a4094b322581b4a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_ba53dffe5a8c4b599a4094b322581b4a_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/roodepoort/wilgeheuwel/apartment/1833438/86-the-falls-2-lifestyle-estate-45-shearwater-road/"
  },
  {
    "id": "afhco-1833382",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Little Falls",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,300 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Roodepoort",
    "suburb": "Little Falls",
    "address": "206 The Falls Lifestyle Estate, 0B Van Staden Road, Little Falls, Roodepoort",
    "priceAmount": 10300,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.7,
    "reviewCount": 30,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_bed38f8eca954edb8eb3386b88ca6cdd_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_bed38f8eca954edb8eb3386b88ca6cdd_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_bed38f8eca954edb8eb3386b88ca6cdd_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_bed38f8eca954edb8eb3386b88ca6cdd_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_bed38f8eca954edb8eb3386b88ca6cdd_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_74fb1e17893a43599635677a7844e491_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_74fb1e17893a43599635677a7844e491_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_74fb1e17893a43599635677a7844e491_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_25c464fc596c4b788db2cc67e3988b7e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_25c464fc596c4b788db2cc67e3988b7e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_25c464fc596c4b788db2cc67e3988b7e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_c692b5ae00da49298222fc1a263cf85d_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_c692b5ae00da49298222fc1a263cf85d_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_c692b5ae00da49298222fc1a263cf85d_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_80e29137f7a84c42ab26307b495631eb_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_80e29137f7a84c42ab26307b495631eb_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_80e29137f7a84c42ab26307b495631eb_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a9f429b4fbcc4eda8b8b6ff02d0719dc_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a9f429b4fbcc4eda8b8b6ff02d0719dc_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a9f429b4fbcc4eda8b8b6ff02d0719dc_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_2334f5357a7648008771b0684c779ea8_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_2334f5357a7648008771b0684c779ea8_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_2334f5357a7648008771b0684c779ea8_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_f6f732f8aaff45aeb307174d06f95906_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_f6f732f8aaff45aeb307174d06f95906_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_f6f732f8aaff45aeb307174d06f95906_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_476e8857be934458bb8e5bee58c79c83_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_476e8857be934458bb8e5bee58c79c83_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_476e8857be934458bb8e5bee58c79c83_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a72581483bf840af90f358a02e93df19_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a72581483bf840af90f358a02e93df19_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_a72581483bf840af90f358a02e93df19_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_2f60560b45aa43c5b2cf5f8e9c27f7c5_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_2f60560b45aa43c5b2cf5f8e9c27f7c5_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_2f60560b45aa43c5b2cf5f8e9c27f7c5_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_1b3fdbcddbdd457a96854df25f19ec37_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_1b3fdbcddbdd457a96854df25f19ec37_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2024/11/688_1b3fdbcddbdd457a96854df25f19ec37_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/roodepoort/little-falls/apartment/1833382/206-the-falls-lifestyle-estate-0b-van-staden-road/"
  },
  {
    "id": "afhco-3139378",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Riversands",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,100 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Midrand",
    "suburb": "Riversands",
    "address": "13-1D The Parks Lifestyle Apartments, 22 Riversands Boulevard, Riversands, Midrand",
    "priceAmount": 10100,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.7,
    "reviewCount": 28,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_a102dd3846d94e52831afbe54b89fc7a_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_a102dd3846d94e52831afbe54b89fc7a_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_a102dd3846d94e52831afbe54b89fc7a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_a102dd3846d94e52831afbe54b89fc7a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_a102dd3846d94e52831afbe54b89fc7a_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d4430614bc264aeaa18687ae9cc0b1ca_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d4430614bc264aeaa18687ae9cc0b1ca_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_d4430614bc264aeaa18687ae9cc0b1ca_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_92cf4eb31f0c470881c03dca047f2604_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_92cf4eb31f0c470881c03dca047f2604_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_92cf4eb31f0c470881c03dca047f2604_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_96450d9f257243d08973b7e86c2a3fb4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_96450d9f257243d08973b7e86c2a3fb4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_96450d9f257243d08973b7e86c2a3fb4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ed1672d9bc6d4ab9a19643b70d797068_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ed1672d9bc6d4ab9a19643b70d797068_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ed1672d9bc6d4ab9a19643b70d797068_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_73e335cf1575402fad82a35bde07af6a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_73e335cf1575402fad82a35bde07af6a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_73e335cf1575402fad82a35bde07af6a_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_f4367c83b6c44edb9c6d66f1137b29b3_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_f4367c83b6c44edb9c6d66f1137b29b3_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_f4367c83b6c44edb9c6d66f1137b29b3_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8ba0c4bb4f9748cebb5697d90252d3b5_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8ba0c4bb4f9748cebb5697d90252d3b5_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8ba0c4bb4f9748cebb5697d90252d3b5_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8430e6f796c34e01b13242c7fde9b3af_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8430e6f796c34e01b13242c7fde9b3af_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_8430e6f796c34e01b13242c7fde9b3af_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_607d8db7c2bb4c21b30c31e9d823e1b2_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_607d8db7c2bb4c21b30c31e9d823e1b2_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_607d8db7c2bb4c21b30c31e9d823e1b2_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_bf2e5238bdec4213bd6de862f67b5749_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_bf2e5238bdec4213bd6de862f67b5749_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_bf2e5238bdec4213bd6de862f67b5749_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_c66493192e6e404a9e778ad43ad6fd04_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_c66493192e6e404a9e778ad43ad6fd04_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_c66493192e6e404a9e778ad43ad6fd04_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_846a7bb285ee4e8a8528c41b33d52f71_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_846a7bb285ee4e8a8528c41b33d52f71_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_846a7bb285ee4e8a8528c41b33d52f71_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_654b287165c849409674fc82c5384348_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_654b287165c849409674fc82c5384348_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_654b287165c849409674fc82c5384348_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b9d27a0a03d44423817df1263f6feb39_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b9d27a0a03d44423817df1263f6feb39_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b9d27a0a03d44423817df1263f6feb39_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_941ffe38854f4397a62e2a97e217a770_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_941ffe38854f4397a62e2a97e217a770_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_941ffe38854f4397a62e2a97e217a770_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_71f8743301d04082bd616699a29051f2_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_71f8743301d04082bd616699a29051f2_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_71f8743301d04082bd616699a29051f2_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_da3f7bd727b4458ba5d004d2113ff585_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_da3f7bd727b4458ba5d004d2113ff585_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_da3f7bd727b4458ba5d004d2113ff585_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_72caf422f7f44c0194158e104e10a435_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_72caf422f7f44c0194158e104e10a435_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_72caf422f7f44c0194158e104e10a435_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3bcaf21dd293460bb2a4f45b53f159c4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3bcaf21dd293460bb2a4f45b53f159c4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3bcaf21dd293460bb2a4f45b53f159c4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_802fe31f0fe4400f9f3c1defa0eb6e5d_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_802fe31f0fe4400f9f3c1defa0eb6e5d_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_802fe31f0fe4400f9f3c1defa0eb6e5d_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_090b5b48bd414232be061eaf314657f4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_090b5b48bd414232be061eaf314657f4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_090b5b48bd414232be061eaf314657f4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_661e83f8d3a0413f8cf6651ca40e3805_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_661e83f8d3a0413f8cf6651ca40e3805_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_661e83f8d3a0413f8cf6651ca40e3805_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4af090fd219e45c7ab76b793f9ccc76f_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4af090fd219e45c7ab76b793f9ccc76f_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4af090fd219e45c7ab76b793f9ccc76f_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_29893af9f01b49baad43c1150ef6702d_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_29893af9f01b49baad43c1150ef6702d_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_29893af9f01b49baad43c1150ef6702d_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_9fc074126a9d4336ba350d3846f559ec_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_9fc074126a9d4336ba350d3846f559ec_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_9fc074126a9d4336ba350d3846f559ec_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_eb2f3f2f325344488f74e689dc50d329_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_eb2f3f2f325344488f74e689dc50d329_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_eb2f3f2f325344488f74e689dc50d329_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle apartments",
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/midrand/riversands/apartment/3139378/13-1d-the-parks-lifestyle-apartments-22-riversands-boulevard/"
  },
  {
    "id": "afhco-3139460",
    "ownerId": "44444444-4444-4444-4444-444444444444",
    "title": "3 Bedroom Apartment To Let in Kyalami Park",
    "description": "Premium AFHCO Available Now inventory selected from the current high-to-low rental feed. This 3 bedroom monthly apartment is listed at R10,000 per month and includes the source gallery for a richer leasing.properties detail page.",
    "category": "residential",
    "duration": "monthly",
    "city": "Midrand",
    "suburb": "Kyalami Park",
    "address": "49-2H The Parks Lifestyle Apartments, 22 Riversands Boulevard, Kyalami Park, Midrand",
    "priceAmount": 10000,
    "priceUnit": "month",
    "bedrooms": 3,
    "bathrooms": 2,
    "capacity": 6,
    "verified": true,
    "neatStock": true,
    "ratingAverage": 4.6,
    "reviewCount": 26,
    "imageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0c45924633014ec4b96a6f0f9337144a_t_w_1024_h_768.avif",
    "lowDataImageUrl": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0c45924633014ec4b96a6f0f9337144a_t_w_320_h_240.avif",
    "imageGallery": [
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0c45924633014ec4b96a6f0f9337144a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0c45924633014ec4b96a6f0f9337144a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0c45924633014ec4b96a6f0f9337144a_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_47b7e4b2569d40f8b23f5b4378a3ee23_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_47b7e4b2569d40f8b23f5b4378a3ee23_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_47b7e4b2569d40f8b23f5b4378a3ee23_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3073fe1250fa45fe9f26d860689ce3b8_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3073fe1250fa45fe9f26d860689ce3b8_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3073fe1250fa45fe9f26d860689ce3b8_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_81e36eede16c4c3bac102da085f3df20_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_81e36eede16c4c3bac102da085f3df20_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_81e36eede16c4c3bac102da085f3df20_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_dc6279c22c694bc894cbd6ae0e7829c4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_dc6279c22c694bc894cbd6ae0e7829c4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_dc6279c22c694bc894cbd6ae0e7829c4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ecde240c22c64b389dc79bd865d4c8ad_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ecde240c22c64b389dc79bd865d4c8ad_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ecde240c22c64b389dc79bd865d4c8ad_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_75ca246eeee9446187be0c0d5c43b29f_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_75ca246eeee9446187be0c0d5c43b29f_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_75ca246eeee9446187be0c0d5c43b29f_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b0640cc0d15e4a1b98d5ad09c377f2c0_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b0640cc0d15e4a1b98d5ad09c377f2c0_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_b0640cc0d15e4a1b98d5ad09c377f2c0_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e45374154fe84de6a40dd6ffc1494374_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e45374154fe84de6a40dd6ffc1494374_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e45374154fe84de6a40dd6ffc1494374_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_9cd376b4ddd2481ca19c999d57b9d3f7_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_9cd376b4ddd2481ca19c999d57b9d3f7_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_9cd376b4ddd2481ca19c999d57b9d3f7_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4234d94a3f0946fa94badc3bc54be131_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4234d94a3f0946fa94badc3bc54be131_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4234d94a3f0946fa94badc3bc54be131_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0d42f9f603c44d549050e7b60a5567bf_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0d42f9f603c44d549050e7b60a5567bf_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_0d42f9f603c44d549050e7b60a5567bf_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_5a20154741004dfba78f0c7d27e45cd8_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_5a20154741004dfba78f0c7d27e45cd8_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_5a20154741004dfba78f0c7d27e45cd8_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_980cdf002825423baad3493158b497a2_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_980cdf002825423baad3493158b497a2_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_980cdf002825423baad3493158b497a2_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_31b57816f00d493f9539019d0d2d1c7e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_31b57816f00d493f9539019d0d2d1c7e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_31b57816f00d493f9539019d0d2d1c7e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_c1f17d09252f4d64ac5e3ab5aacd83b9_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_c1f17d09252f4d64ac5e3ab5aacd83b9_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_c1f17d09252f4d64ac5e3ab5aacd83b9_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e5c223af2f7a4f4e8fb8a0aa4a4e21d4_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e5c223af2f7a4f4e8fb8a0aa4a4e21d4_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_e5c223af2f7a4f4e8fb8a0aa4a4e21d4_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_2fb975690b79402892bb887fc4036584_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_2fb975690b79402892bb887fc4036584_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_2fb975690b79402892bb887fc4036584_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_6ad66959bac94c54890f565fb53422f3_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_6ad66959bac94c54890f565fb53422f3_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_6ad66959bac94c54890f565fb53422f3_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3f1fa973a50d435387a5dce8028af95e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3f1fa973a50d435387a5dce8028af95e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3f1fa973a50d435387a5dce8028af95e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1530e2bab596439aaea249daf14d4f55_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1530e2bab596439aaea249daf14d4f55_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_1530e2bab596439aaea249daf14d4f55_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_44be8749f17248f6b66557a48f3dd8fe_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_44be8749f17248f6b66557a48f3dd8fe_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_44be8749f17248f6b66557a48f3dd8fe_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4eb90070a63d41e3bcf8dbd668dacea1_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4eb90070a63d41e3bcf8dbd668dacea1_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_4eb90070a63d41e3bcf8dbd668dacea1_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_81297a7675bc40d9a644313564d0681e_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_81297a7675bc40d9a644313564d0681e_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_81297a7675bc40d9a644313564d0681e_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_61d6d9d81b5b4271b154a1034e02e6d6_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_61d6d9d81b5b4271b154a1034e02e6d6_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_61d6d9d81b5b4271b154a1034e02e6d6_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_800349ac20c64badb934929e705e6c32_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_800349ac20c64badb934929e705e6c32_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_800349ac20c64badb934929e705e6c32_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_f3f2d67c5cac42cebf36c7df4209f8b9_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_f3f2d67c5cac42cebf36c7df4209f8b9_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_f3f2d67c5cac42cebf36c7df4209f8b9_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3389c8ed42bd4cffba26e6af0bac0d7b_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3389c8ed42bd4cffba26e6af0bac0d7b_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_3389c8ed42bd4cffba26e6af0bac0d7b_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_de10a3b810af446fb8029f7e01e7f39f_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_de10a3b810af446fb8029f7e01e7f39f_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_de10a3b810af446fb8029f7e01e7f39f_t_w_320_h_240.avif"
      },
      {
        "large": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ac244f61fbd04d66943bd7ac0562c85a_t_w_1024_h_768.avif",
        "medium": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ac244f61fbd04d66943bd7ac0562c85a_t_w_640_h_480.avif",
        "thumb": "https://d21tw07c6rnmp0.cloudfront.net/media/uploads/688/residential/2026/4/688_ac244f61fbd04d66943bd7ac0562c85a_t_w_320_h_240.avif"
      }
    ],
    "amenities": [
      "lifestyle apartments",
      "lifestyle estate",
      "3 bedroom",
      "2 bathroom",
      "monthly lease"
    ],
    "availableFrom": "2026-05-12",
    "availableTo": "2027-05-31",
    "sourceName": "AFHCO Available Now",
    "sourceUrl": "https://availablenow.afhco.co.za/results/residential/to-let/midrand/kyalami-park/apartment/3139460/49-2h-the-parks-lifestyle-apartments-22-riversands-boulevard/"
  }
  ,
  {
    id: "short-stay-sandton-001",
    ownerId: "33333333-3333-3333-3333-333333333333",
    title: "Sandton City Studio - Short Stay",
    description: "A furnished short-stay studio for guests who need a clean check-in, clear price and host support before arrival.",
    category: "residential",
    duration: "daily",
    city: "Johannesburg",
    suburb: "Sandton",
    address: "Maude Street, Sandton",
    latitude: -26.1076,
    longitude: 28.0567,
    priceAmount: 950,
    priceUnit: "night",
    bedrooms: 1,
    capacity: 2,
    verified: true,
    neatStock: true,
    ratingAverage: 4.7,
    reviewCount: 18,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    lowDataImageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=420&q=60",
    amenities: ["furnished", "self check-in", "short stay", "verified host"],
    availableFrom: "2026-05-20",
    availableTo: "2026-12-31",
    sourceName: "leasing.properties demo stock",
    sourceUrl: "https://leasing.properties"
  },
  {
    id: "short-stay-cape-town-001",
    ownerId: "33333333-3333-3333-3333-333333333333",
    title: "Cape Town Harbour Suite - Short Stay",
    description: "A simple short-stay option for visitors who want to book, pay and receive check-in instructions without a long rental application.",
    category: "residential",
    duration: "daily",
    city: "Cape Town",
    suburb: "Foreshore",
    address: "Dock Road, Cape Town",
    latitude: -33.9068,
    longitude: 18.4217,
    priceAmount: 1250,
    priceUnit: "night",
    bedrooms: 1,
    capacity: 2,
    verified: true,
    neatStock: true,
    ratingAverage: 4.8,
    reviewCount: 24,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
    lowDataImageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=420&q=60",
    amenities: ["furnished", "central", "short stay", "host support"],
    availableFrom: "2026-05-20",
    availableTo: "2026-12-31",
    sourceName: "leasing.properties demo stock",
    sourceUrl: "https://leasing.properties"
  },
  {
    id: "workspace-sandton-boardroom-001",
    ownerId: "33333333-3333-3333-3333-333333333333",
    title: "Sandton Boardroom - Team Workspace",
    description: "A verified workspace for companies that need a boardroom or team space by the hour, with booking confirmation before arrival.",
    category: "commercial",
    duration: "hourly",
    city: "Johannesburg",
    suburb: "Sandton",
    address: "Rivonia Road, Sandton",
    latitude: -26.1071,
    longitude: 28.0562,
    priceAmount: 450,
    priceUnit: "hour",
    bedrooms: 0,
    capacity: 10,
    verified: true,
    neatStock: true,
    ratingAverage: 4.9,
    reviewCount: 31,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80",
    lowDataImageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=420&q=60",
    amenities: ["boardroom", "wifi", "presentation screen", "hourly booking"],
    availableFrom: "2026-05-20",
    availableTo: "2026-12-31",
    sourceName: "leasing.properties demo stock",
    sourceUrl: "https://leasing.properties"
  },
  {
    id: "workspace-midrand-office-001",
    ownerId: "33333333-3333-3333-3333-333333333333",
    title: "Midrand Private Office - Daily Workspace",
    description: "A company-friendly workspace for a focused workday, client meeting or temporary project team.",
    category: "commercial",
    duration: "hourly",
    city: "Midrand",
    suburb: "Waterfall",
    address: "Waterfall Drive, Midrand",
    latitude: -26.0157,
    longitude: 28.1084,
    priceAmount: 380,
    priceUnit: "hour",
    bedrooms: 0,
    capacity: 6,
    verified: true,
    neatStock: true,
    ratingAverage: 4.6,
    reviewCount: 17,
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80",
    lowDataImageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=420&q=60",
    amenities: ["private office", "wifi", "parking", "hourly booking"],
    availableFrom: "2026-05-20",
    availableTo: "2026-12-31",
    sourceName: "leasing.properties demo stock",
    sourceUrl: "https://leasing.properties"
  }

];

export const bookings = [
  {
    id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    listingId: "afhco-1780539",
    tenantId: "11111111-1111-1111-1111-111111111111",
    startsAt: "2026-06-01T10:00:00Z",
    endsAt: "2026-09-01T10:00:00Z",
    status: "deposit_secured",
    reservationStatus: "reserved",
    reservedAt: "2026-04-18T09:00:00Z",
    totalAmount: 37800,
    depositAmount: 12600,
    amountDue: 12978,
    leaseTermMonths: 3,
    serviceFee: 378,
    paymentStatus: "paid",
    paymentMethod: "vodapay",
    telcoChannel: "VodaPay",
    depositStatus: "in_custody",
    custodyStatus: "reconciled",
    custodyProvider: "interest_bearing_trust_account",
    custodyReference: "CUST-EEEEEEEE",
    custodyReceivedAt: "2026-06-01T12:00:00Z",
    interestAccrued: 0,
    releaseStatus: "held_in_custody",
    inspectionStatus: "pending",
    leaseContractStatus: "generated",
    leaseContractGeneratedAt: "2026-06-01T12:03:00Z",
    leasePdfUrl: "/api/bookings/eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee/lease.pdf"
  }
];

export const rewardEvents = [
  { id: "r1", userId: users[0].id, points: 1800, reason: "Corporate rental booking", partnerName: "Listing.properties", createdAt: "2026-04-18" },
  { id: "r2", userId: users[0].id, points: 400, reason: "Verified review", partnerName: "Listing.properties", createdAt: "2026-04-27" },
  { id: "r3", userId: users[0].id, points: 250, reason: "Referral signup", partnerName: "Township Tools Co-op", createdAt: "2026-05-02" }
];

export const vouchers = [
  { id: "v1", partnerName: "Makers Market SA", title: "R250 local decor voucher", pointsCost: 1200, category: "home improvement", supportsSme: true, terms: "Redeemable with participating local makers." },
  { id: "v2", partnerName: "Mzansi Art Rooms", title: "Gallery print discount", pointsCost: 900, category: "art", supportsSme: true, terms: "Valid for emerging artist prints." },
  { id: "v3", partnerName: "Fix-It Collective", title: "Appliance callout credit", pointsCost: 1500, category: "home services", supportsSme: true, terms: "Available in supported metros." }
];

export const ratings = [
  { id: "rt1", listingId: "afhco-1780588", score: 5, comment: "Clean, exactly as listed, host responded quickly.", relationship: "lessee_rates_lessor" },
  { id: "rt2", listingId: "afhco-1780539", score: 5, comment: "Verified lease and transparent deposit handling.", relationship: "lessee_rates_lessor" }
];

export const africanLocations = [
  "Accra, Osu",
  "Benoni, The Stewards",
  "Johannesburg, Hillbrow",
  "Johannesburg, South Hills",
  "Randburg, Northgate",
  "Roodepoort, Wilgeheuwel",
  "Soweto, Jabulani",
  "Vereeniging, Peacehaven"
];
