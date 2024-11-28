import React, { useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { IoClose } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Styles from "./Home.module.scss";
import Paginate from "../../components/Paginate/Paginate";
import { Link } from "react-router-dom";
import { IoLink } from "react-icons/io5";

const cx = classNames.bind(Styles);

const radiuses = [100, 500, 1000, 2000];

const types = ["Hotel", "Restaurant", "Travel"];

const locations = [
  "Hải Châu",
  "Thanh Khê",
  "Sơn Trà",
  "Ngũ Hành Sơn",
  "Cẩm Lệ",
  "Liên Chiểu",
  "Hòa Vang",
  "Hoàng Sa",
  "Khác",
];

const data = [
  {
    title:
      "Moonlight Hotel & Massage VIP - Beautiful City View, Dragon Bridge View, Center City",
    link: "https://www.booking.com/hotel/vn/moonlight-da-nang.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from=searchresults",
    describe:
      "Moonlight Hotel & Massage VIP - Beautiful City View, Dragon Bridge View, Center City tọa lạc trong vòng bán kính 1,5 km từ Ga Đà Nẵng và Sân bay Quốc tế Đà Nẵng.",
    rate: 8.7,
    overall_review: "Tuyệt vời",
    address: "136-138-140 Phan Chu Trinh, Đà Nẵng, Việt Nam",
    latlng: "16.06383343,108.21981668",
    type: "hotel",
    id: 1446,
    created_at: "2024-11-10T18:16:08",
    updated_at: "2024-11-10T18:16:08",
  },
  {
    title: "Hai Trieu Hotel",
    link: "https://www.booking.com/hotel/vn/hai-trieu-da-nang1.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=2&hapos=2&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Hai Trieu Hotel có hồ bơi ngoài trời, trung tâm thể dục, sân hiên và nhà hàng ở Đà Nẵng. Khách sạn 4 sao này có dịch vụ văn phòng và dịch vụ tiền sảnh.",
    rate: 8.6,
    overall_review: "Tuyệt vời",
    address: "18 - 20 Loseby , Đà Nẵng, Việt Nam",
    latlng: "16.07334900,108.24074100",
    type: "hotel",
    id: 1447,
    created_at: "2024-11-10T18:16:10",
    updated_at: "2024-11-10T18:16:10",
  },
  {
    title: "Bantique Hotel",
    link: "https://www.booking.com/hotel/vn/bantique.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=3&hapos=3&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from=searchresults",
    describe:
      "Nằm ở thành phố Đà Nẵng, cách Cầu Sông Hàn 400 m, Bantique Hotel cung cấp miễn phí cả WiFi và chỗ đỗ xe riêng. Khách sạn này cũng có trung tâm spa, phòng xông hơi khô và quán bar phục vụ đồ uống.",
    rate: 8.0,
    overall_review: "Rất tốt",
    address: "17 Phạm Văn Đồng, Đà Nẵng, Việt Nam",
    latlng: "16.07162974,108.23499804",
    type: "hotel",
    id: 1448,
    created_at: "2024-11-10T18:16:12",
    updated_at: "2024-11-10T18:16:12",
  },
  {
    title: "De Pansy Residences",
    link: "https://www.booking.com/hotel/vn/de-pansi-residences.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=4&hapos=4&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from=searchresults",
    describe:
      "Nằm ở Đà Nẵng, De Pansy Residences cung cấp chỗ nghỉ có sân hiên hoặc ban công, Wi-Fi miễn phí và TV màn hình phẳng, cũng như hồ bơi ngoài trời và khu vườn.",
    rate: 9.4,
    overall_review: "Tuyệt hảo",
    address: "31a Đỗ Bá, Đà Nẵng, Việt Nam",
    latlng: "16.05167779,108.24564401",
    type: "hotel",
    id: 1449,
    created_at: "2024-11-10T18:16:14",
    updated_at: "2024-11-10T18:16:14",
  },
  {
    title: "ChiPa Homestay",
    link: "https://www.booking.com/hotel/vn/chipa-homestay.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=5&hapos=5&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Nằm tại vị trí thuận tiện ở trung tâm Đà Nẵng, ChiPa Homestay cách Bãi biển Thanh Bình 2.5 km và Bảo tàng điêu khắc Chăm 1.8 km.",
    rate: 9.1,
    overall_review: "Tuyệt hảo",
    address:
      "K10/1A Phạm Văn Nghị Phường Thạch Gián - Quận Thanh Khê - Tp Đà Nẵng, Đà Nẵng, Việt Nam",
    latlng: "16.05915300,108.20956700",
    type: "hotel",
    id: 1450,
    created_at: "2024-11-10T18:16:16",
    updated_at: "2024-11-10T18:16:16",
  },
  {
    title: "J-BAY Beachfront Boutique Hotel",
    link: "https://www.booking.com/hotel/vn/truong-tai.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=6&hapos=6&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from=searchresults",
    describe:
      "Nằm ở Đà Nẵng, cách Bãi biển Mỹ Khê 16 phút đi bộ, J-BAY Beachfront Boutique Hotel cung cấp chỗ nghỉ có hồ bơi ngoài trời, chỗ đậu xe riêng miễn phí, khu vực bãi biển riêng và phòng chờ chung.",
    rate: 9.1,
    overall_review: "Tuyệt hảo",
    address: "Số 12 đường Lâm Hoành, Phước Mỹ, Sơn Trà, Đà Nẵng, Việt Nam",
    latlng: "16.06314750,108.24510705",
    type: "hotel",
    id: 1451,
    created_at: "2024-11-10T18:16:18",
    updated_at: "2024-11-10T18:16:18",
  },
  {
    title: "AOA Danang Beach Hotel",
    link: "https://www.booking.com/hotel/vn/aoa-amp-apartment-danang.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=7&hapos=7&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Tọa lạc ở Đà Nẵng, AOA Danang Beach Hotel cung cấp Wi-Fi miễn phí, nơi khách có thể trải nghiệm khu vườn, phòng chờ chung và sân hiên.",
    rate: 8.3,
    overall_review: "Rất tốt",
    address:
      "Lô 42 - 43 Trần Bạch ĐẰng, phường Mỹ An, quận Ngũ Hành Sơn Đà Nẵng Lô 42 - 43, Đà Nẵng, Việt Nam",
    latlng: "16.05564000,108.24568300",
    type: "hotel",
    id: 1452,
    created_at: "2024-11-10T18:16:20",
    updated_at: "2024-11-10T18:16:20",
  },
  {
    title: "Nostalgia Boutique Hotel",
    link: "https://www.booking.com/hotel/vn/nostalgia-ds.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=8&hapos=8&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Nằm ở Đà Nẵng, cách Bãi biển Bắc Mỹ An chưa đến 1 km, Nostalgia Boutique Hotel cung cấp chỗ nghỉ có trung tâm thể dục, chỗ đậu xe riêng miễn phí, phòng chờ chung và sân hiên.",
    rate: 8.4,
    overall_review: "Rất tốt",
    address: "11A Ho Xuan Huong Street, Đà Nẵng, Việt Nam",
    latlng: "16.03894364,108.24417793",
    type: "hotel",
    id: 1453,
    created_at: "2024-11-10T18:16:22",
    updated_at: "2024-11-10T18:16:22",
  },
  {
    title: "Binh Duong Resident Hotel",
    link: "https://www.booking.com/hotel/vn/binh-duong-q-hai-chau.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=9&hapos=9&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from=searchresults",
    describe:
      "Nằm tại vị trí thuận tiện ở Đà Nẵng, Binh Duong Resident Hotel cung cấp các phòng điều hòa với Wi-Fi miễn phí và chỗ đậu xe riêng miễn phí. Khách sạn 3 sao này có quầy lễ tân 24 giờ và bàn bán tour.",
    rate: 8.3,
    overall_review: "Rất tốt",
    address: "32 Tran Phu Street, Hai Chau District, Đà Nẵng, Việt Nam",
    latlng: "16.07389500,108.22362400",
    type: "hotel",
    id: 1454,
    created_at: "2024-11-10T18:16:24",
    updated_at: "2024-11-10T18:16:24",
  },
  {
    title: "Dreamy Sky - Airport View Boutique Hotel",
    link: "https://www.booking.com/hotel/vn/dreamy-sky.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=10&hapos=10&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Với sân hiên, Dreamy Sky - Airport View Boutique Hotel cung cấp chỗ nghỉ ở Đà Nẵng, cách Bãi biển Thanh Bình 2.2 km và Bảo tàng điêu khắc Chăm 2.3 km.",
    rate: 7.6,
    overall_review: "Tốt",
    address:
      "Cong san bay quoc te Da Nang, Duong Nguyen Van Linh, Da Nang, Đà Nẵng, Việt Nam",
    latlng: "16.05936363,108.20400273",
    type: "hotel",
    id: 1455,
    created_at: "2024-11-10T18:16:26",
    updated_at: "2024-11-10T18:16:26",
  },
  {
    title: "Le Indochina Hotel & Beach Da Nang City",
    link: "https://www.booking.com/hotel/vn/hemera-boutique.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=11&hapos=11&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Tọa lạc ở nội thành Đà Nẵng và cách bãi biển Mỹ An 800 m, Le Indochina Hotel & Beach Da Nang City sở hữu hồ bơi ngoài trời cùng trung tâm spa và cung cấp WiFi miễn phí trong toàn khuôn viên.",
    rate: 8.2,
    overall_review: "Rất tốt",
    address: "91 Ho Xuan Huong, Đà Nẵng, Việt Nam",
    latlng: "16.04046618,108.24739865",
    type: "hotel",
    id: 1456,
    created_at: "2024-11-10T18:16:28",
    updated_at: "2024-11-10T18:16:28",
  },
  {
    title: "Vitalis Riverside Hotel",
    link: "https://www.booking.com/hotel/vn/vitalis-riverside.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=12&hapos=12&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Tọa lạc ở Đà Nẵng và cách Bãi biển Mỹ Khê 2.9 km, Vitalis Riverside Hotel cung cấp dịch vụ tiền sảnh, các phòng không hút thuốc, khu vườn, Wi-Fi miễn phí ở toàn bộ chỗ nghỉ và sân hiên.",
    rate: 7.9,
    overall_review: "Tốt",
    address: "105 Tran Hung Dao, Đà Nẵng, Việt Nam",
    latlng: "16.08068600,108.22902200",
    type: "hotel",
    id: 1457,
    created_at: "2024-11-10T18:16:30",
    updated_at: "2024-11-10T18:16:30",
  },
  {
    title: "Yen Vy Hotel and Apartment",
    link: "https://www.booking.com/hotel/vn/yen-vy.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=13&hapos=13&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Nằm ở Đà Nẵng, cách Bãi biển Mỹ Khê 4 phút đi bộ và Bãi biển Bắc Mỹ An chưa đến 1 km, Yen Vy Hotel and Apartment cung cấp chỗ nghỉ có sân hiên.",
    rate: 8.5,
    overall_review: "Rất tốt",
    address: "24 An Thượng 30, Đà Nẵng, Việt Nam",
    latlng: "16.05121770,108.24609498",
    type: "hotel",
    id: 1458,
    created_at: "2024-11-10T18:16:32",
    updated_at: "2024-11-10T18:16:32",
  },
  {
    title: "Palmier Hotel - Art House Da Nang",
    link: "https://www.booking.com/hotel/vn/academy.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=14&hapos=14&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Nằm tại vị trí thuận tiện ở Sông Hàn, Đà Nẵng, Palmier Hotel - Art House Da Nang nằm cách Bãi biển Mỹ Khê 3 km, Cầu sông Hàn 8 phút đi bộ và Cầu khóa Tình yêu Đà Nẵng 1.3 km.",
    rate: 7.9,
    overall_review: "Tốt",
    address: "305 Tran Hung Dao, An Hai Bac, Son Tra, Đà Nẵng, Việt Nam",
    latlng: "16.07498007,108.22902203",
    type: "hotel",
    id: 1459,
    created_at: "2024-11-10T18:16:35",
    updated_at: "2024-11-10T18:16:35",
  },
  {
    title: "Grand Sea Hotel Danang",
    link: "https://www.booking.com/hotel/vn/grand-sea.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=15&hapos=15&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Chỉ cách 200 m từ bãi biển, Grand Sea Hotel Danang cung cấp các phòng nghỉ hiện đại và thanh lịch, cách 1,9 km từ Cầu Sông Hàn tại thành phố biển Đà Nẵng.",
    rate: 8.2,
    overall_review: "Rất tốt",
    address:
      "08 Ha Bong street, Phuoc My ward, Son Tra district, Da Nang city, Vietnam, Đà Nẵng, Việt Nam",
    latlng: "16.06852213,108.24419796",
    type: "restaurant",
    id: 1460,
    created_at: "2024-11-10T18:16:37",
    updated_at: "2024-11-10T18:16:37",
  },
  {
    title: "Hoa Phong Airport Danang Hotel",
    link: "https://www.booking.com/hotel/vn/hoa-phong.vi.html?label=New_English_EN_VI_27026991745-5OUaQVHbaxmylzmziyDxjQS637942152155%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-303068456341%3Alp1028809%3Ali%3Adec%3Adm%3Aag27026991745%3Acmp400679185&sid=9198e71754e6b12b798a133531b16610&gclid=CjwKCAjwiaa2BhAiEiwAQBgyHkyDuPcGijmW-1fZk8Z5Qk7LB6EN5bMKvqz3JzcSzveSv2jvVrkDHBoCpKoQAvD_BwE&aid=318615&ucfs=1&arphpl=1&dest_id=-3712125&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=16&hapos=16&sr_order=popularity&srpvid=0ef94889192c05fa&srepoch=1728129689&from_sustainable_property_sr=1&from=searchresults",
    describe:
      "Nằm ở Đà Nẵng, cách Bãi biển Thanh Bình 12 phút đi bộ, Hoa Phong Airport Danang Hotel cung cấp chỗ nghỉ có phòng chờ chung, chỗ đậu xe riêng miễn phí và nhà hàng.",
    rate: 8.7,
    overall_review: "Tuyệt vời",
    address: "366 - 367 Nguyen Tat Thanh, Đà Nẵng, Việt Nam",
    latlng: "16.07721171,108.20840606",
    type: "travel",
    id: 1461,
    created_at: "2024-11-10T18:16:39",
    updated_at: "2024-11-10T18:16:39",
  },
];

const DetailModal = ({ show, onHide, dataDetail }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  return (
    <div
      className={cx("modal", show ? "show-modal" : "hidden-modal")}
      onClick={onHide}
    >
      <div
        className={cx("modal-container", show ? "slide-in" : "slide-out")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("modal-header")}>
          <h5 className={cx("modal-title")}>{dataDetail.title}</h5>
          <button className={cx("close-btn")} onClick={onHide}>
            <IoClose className={cx("close-icon")} />
          </button>
        </div>
        <div className={cx("modal-body")}>
          <div className={cx("modal-address")}>
            <span className={cx("modal-address-title")}>Địa chỉ:</span>
            <span className={cx("modal-address-conten")}>
              {dataDetail.address}
            </span>
          </div>
          <div className={cx("modal-desc")}>
            <span className={cx("modal-desc-title")}>Mô tả:</span>
            <span className={cx("modal-desc-content")}>
              {dataDetail.describe}
            </span>
          </div>
          <div className={cx("modal-review")}>
            <span className={cx("modal-review-title")}>Đánh giá:</span>
            <span className={cx("location-item-content-item")}>
              {dataDetail.rate}
            </span>
          </div>
          <div className={cx("modal-review")}>
            <span className={cx("modal-review-title")}>Nhận xét:</span>
            <span className={cx("location-item-content-item")}>
              {dataDetail.overall_review}
            </span>
          </div>
          <div className={cx("modal-review")}>
            <span className={cx("modal-review-title")}>Link:</span>
            {dataDetail.link ? (
              <Link
                to={dataDetail.link}
                className={cx("location-item-content-item")}
                target="_blank"
              >
                <IoLink className={cx("link-icon")} />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function deg2rad(degrees) {
  var pi = Math.PI;

  return degrees * (pi / 180);
}

const haversineDistance = (coord1, coord2) => {
  const R = 6371000;
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLng = deg2rad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) *
      Math.cos(deg2rad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.asin(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Home = () => {
  const [searchHotelValue, setSearchHotelValue] = useState([]);
  const [searchRestaurantValue, setSearchRestaurantValue] = useState([]);
  const [searchTravelValue, setSearchTravelValue] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [activeItem, setActiveItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");
  const [locationsSearch, setLocationSearch] = useState([]);
  const [locationOrigin, setLocationOrigin] = useState({ lat: 0, lng: 0 });
  const [radius, setRadius] = useState(100);
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFilterLocation, setIsOpenFilterLocation] = useState(false);
  const [isOpenFilterDistrict, setIsOpenFilterDistrict] = useState(false);

  const handleChangeSearch = (e) => {
    const result = e.target.value;
    if (result.trim().length > 0) {
      setSearchValue(e.target.value);
      const searchData = data.filter((item) =>
        item.title.toLowerCase().includes(result.toLowerCase())
      );
      setLocationSearch(searchData);
      setIsOpen(true);
    } else {
      setSearchValue("");
      setIsSubmit(false);
      setIsOpen(false);
    }
  };

  const handleClickOption = (data) => {
    setLocationSearch([]);
    setSearchValue(data.title);
    const [lat, lng] = data.latlng.split(",").map(Number);
    setLocationOrigin({ lat: lat, lng: lng });
    setIsOpen(false);
  };

  const dataHotels = data.filter((item) => item.type === "hotel");
  const dataRestaurants = data.filter((item) => item.type === "restaurant");
  const dataTravels = data.filter((item) => item.type === "travel");

  const handleChangeLocation = () => {
    const nearbyPlaces = data.filter((place) => {
      if (!place.latlng) return false;
      const [lat, lng] = place.latlng.split(",").map(Number);
      const distance = haversineDistance(locationOrigin, { lat, lng });

      const typeFilter = type
        ? place.type.toLocaleLowerCase().includes(type.toLocaleLowerCase())
        : "all";

      return distance <= radius && typeFilter;
    });

    const hotelData = nearbyPlaces.filter((item) => item.type === "hotel");
    const restaurantData = nearbyPlaces.filter(
      (item) => item.type === "restaurant"
    );
    const travelData = nearbyPlaces.filter((item) => item.type === "travel");
    setSearchHotelValue(hotelData);
    setSearchRestaurantValue(restaurantData);
    setSearchTravelValue(travelData);
    setIsSubmit(true);

    localStorage.setItem("dataPoints", JSON.stringify(nearbyPlaces));
    window.open("/map-point", "_blank");
  };

  const handleChangeDistrict = () => {
    const searchData = data.filter((item) => {
      const locationFilter =
        location === "Khác"
          ? !locations.some(
              (value) => value !== "Khác" && item.address.includes(value)
            )
          : location === ""
          ? "all"
          : item.address.includes(location);
      const typeFilter = type
        ? item.type.toLowerCase().includes(type.toLowerCase())
        : "all";
      return locationFilter && typeFilter;
    });
    const hotelData = searchData.filter((item) => item.type === "hotel");
    const restaurantData = searchData.filter(
      (item) => item.type === "restaurant"
    );
    const travelData = searchData.filter((item) => item.type === "travel");
    setSearchHotelValue(hotelData);
    setSearchRestaurantValue(restaurantData);
    setSearchTravelValue(travelData);
    setIsSubmit(true);

    localStorage.setItem("dataPoints", JSON.stringify(searchData));

    if (searchData.length > 0) {
      window.open("/map-point", "_blank");
    }
  };

  // Pagination Hotel
  const [currentHotelPage, setCurrentHotelPage] = useState(0);
  const [recordsHotelPerPage, setRecordsHotelPerPage] = useState(5);
  const startHotelIndex = currentHotelPage * recordsHotelPerPage;
  const endHotelIndex = Math.min(
    startHotelIndex + recordsHotelPerPage,
    isSubmit ? searchHotelValue.length : dataHotels.length
  );
  const recordsHotel = isSubmit
    ? searchHotelValue.slice(startHotelIndex, endHotelIndex)
    : dataHotels.slice(startHotelIndex, endHotelIndex);
  const npageHotel = isSubmit
    ? Math.ceil(searchHotelValue.length / recordsHotelPerPage)
    : Math.ceil(dataHotels.length / recordsHotelPerPage);

  const handlePageHotelClick = (data) => {
    setCurrentHotelPage(data.selected);
  };

  // Pagination Restaurant
  const [currentRestaurantPage, setCurrentRestaurantPage] = useState(0);
  const [recordsRestaurantPerPage, setRecordsRestaurantPerPage] = useState(5);
  const startRestaurantIndex = currentRestaurantPage * recordsRestaurantPerPage;
  const endRestaurantIndex = Math.min(
    startRestaurantIndex + recordsRestaurantPerPage,
    isSubmit ? searchRestaurantValue.length : dataRestaurants.length
  );
  const recordsRestaurant = isSubmit
    ? searchRestaurantValue.slice(startRestaurantIndex, endRestaurantIndex)
    : dataRestaurants.slice(startRestaurantIndex, endRestaurantIndex);
  const npageRestaurant = isSubmit
    ? Math.ceil(searchRestaurantValue.length / recordsRestaurantPerPage)
    : Math.ceil(dataRestaurants.length / recordsRestaurantPerPage);

  const handlePageRestaurantClick = (data) => {
    setCurrentRestaurantPage(data.selected);
  };

  // Pagination Travel
  const [currentTravelPage, setCurrentTravelPage] = useState(0);
  const [recordsTravelPerPage, setRecordsTravelPerPage] = useState(5);
  const startTravelIndex = currentTravelPage * recordsTravelPerPage;
  const endTravelIndex = Math.min(
    startTravelIndex + recordsTravelPerPage,
    isSubmit ? searchTravelValue.length : dataTravels.length
  );
  const recordsTravel = isSubmit
    ? searchTravelValue.slice(startTravelIndex, endTravelIndex)
    : dataTravels.slice(startTravelIndex, endTravelIndex);
  const npageTravel = isSubmit
    ? Math.ceil(searchTravelValue.length / recordsTravelPerPage)
    : Math.ceil(dataTravels.length / recordsTravelPerPage);

  const handlePageTravelClick = (data) => {
    setCurrentTravelPage(data.selected);
  };

  const handleShowDetail = (data) => {
    setShowDetail(true);
    setDataDetail(data);
  };

  const handleActiveItem = (data) => {
    setActiveItem((prevActiveItem) => {
      const isItemActive = prevActiveItem.some(
        (item) => item.title === data.title
      );

      if (isItemActive) {
        return prevActiveItem.filter((item) => item.title !== data.title);
      } else {
        return [...prevActiveItem, data];
      }
    });
  };

  const handleSearch = () => {
    localStorage.setItem("activeItem", JSON.stringify(activeItem));
    window.open("/map", "_blank");
  };

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("body-title")}>
        Gợi ý các địa điểm bạn có thể lựa chọn
      </h3>

      <div className={cx("filter")}>
        {isOpenFilterLocation ? (
          <div className={cx("select")}>
            <span className={cx("select-title")}>Khu vực</span>
            <div className={cx("search-wrapper")}>
              <input
                type="search"
                placeholder="Khu vực"
                className={cx("search-input")}
                value={searchValue}
                onChange={handleChangeSearch}
              />
              {isOpen ? (
                <div className={cx("search-options")}>
                  {locationsSearch.map((item, index) => (
                    <div
                      key={index}
                      className={cx("search-option")}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <span className={cx("select-title")}>Bán kính (m)</span>
            <CustomSelect
              options={radiuses}
              onChange={(option) => setRadius(option)}
              placeHolder="Bán kính"
            />
            <span className={cx("select-title")}>Địa điểm</span>
            <CustomSelect
              options={types}
              onChange={(option) => setType(option)}
              placeHolder="Địa điểm"
            />
            <button className={cx("btn-search")} onClick={handleChangeLocation}>
              Tìm kiếm địa chỉ
            </button>
          </div>
        ) : (
          <button
            className={cx("filter-btn")}
            onClick={() => {
              setIsOpenFilterLocation(true);
              setIsOpenFilterDistrict(false);
            }}
          >
            Tìm kiếm theo khu vực
          </button>
        )}
        {isOpenFilterDistrict ? (
          <div className={cx("select")}>
            <span className={cx("select-title")}>Quận/huyện</span>
            <CustomSelect
              options={locations}
              onChange={(option) => setLocation(option)}
              placeHolder="Quận/huyện"
            />
            <span className={cx("select-title")}>Địa điểm</span>
            <CustomSelect
              options={types}
              onChange={(option) => setType(option)}
              placeHolder="Địa điểm"
            />
            <button className={cx("btn-search")} onClick={handleChangeDistrict}>
              Tìm kiếm địa chỉ
            </button>
          </div>
        ) : (
          <button
            className={cx("filter-btn")}
            onClick={() => {
              setIsOpenFilterLocation(false);
              setIsOpenFilterDistrict(true);
            }}
          >
            Tìm kiếm theo quận
          </button>
        )}
      </div>

      <div className={cx("location-list-display")}>
        <span className={cx("location-list-title")}>Khách sạn</span>
        <Paginate
          npage={npageHotel}
          handlePageClick={handlePageHotelClick}
          currentPage={currentHotelPage}
        />
      </div>
      {recordsHotel.length > 0 ? (
      <div className={cx("location-list")}>
        {recordsHotel.map((item, index) => (
          <div
            className={cx(
              "location-item",
              activeItem.some((active) => active.title === item.title)
                ? "active-item"
                : ""
            )}
            key={index}
          >
            <div className={cx("location-item-body")}>
              <div className={cx("location-item-header")}>
                <span className={cx("location-item-name")}>{item.title}</span>
              </div>
              <div className={cx("location-item-desc")}>
                <span className={cx("location-item-title")}>Mô tả: </span>
                <span className={cx("location-item-content")}>
                  {item.describe}
                </span>
                <div className={cx("location-item-review")}>
                  <span className={cx("location-item-title")}>Đánh giá: </span>
                  <span className={cx("location-item-content")}>
                    <span className={cx("location-item-content-item")}>
                      {item.rate}
                    </span>
                  </span>
                </div>
                <div className={cx("location-item-review")}>
                  <span className={cx("location-item-title")}>Nhận xét: </span>
                  <span className={cx("location-item-content")}>
                    <span className={cx("location-item-content-item")}>
                      {item.overall_review}
                    </span>
                  </span>
                </div>

                <div className={cx("location-footer")}>
                  <button
                    className={cx("location-detail-btn")}
                    onClick={() => handleShowDetail(item)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className={cx("location-choose-btn")}
                    onClick={() => handleActiveItem(item)}
                  >
                    Chọn
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      ) : (
        <span className={cx("notify")}>Không có địa chỉ nằm trong khu vực tìm kiếm</span>
      )}

      <div className={cx("location-list-display")}>
        <span className={cx("location-list-title")}>Địa điểm ăn uống</span>
        <Paginate
          npage={npageRestaurant}
          handlePageClick={handlePageRestaurantClick}
          currentPage={currentRestaurantPage}
        />
      </div>
      {recordsRestaurant.length > 0 ? (
      <div className={cx("location-list")}>
        {recordsRestaurant.map((item, index) => (
          <div
            className={cx(
              "location-item",
              activeItem.some((active) => active.title === item.title)
                ? "active-item"
                : ""
            )}
            key={index}
          >
            <div className={cx("location-item-body")}>
              <div className={cx("location-item-header")}>
                <span className={cx("location-item-name")}>{item.title}</span>
              </div>
              <div className={cx("location-item-desc")}>
                <span className={cx("location-item-title")}>Mô tả: </span>
                <span className={cx("location-item-content")}>
                  {item.describe}
                </span>
                <div className={cx("location-item-review")}>
                  <span className={cx("location-item-title")}>Đánh giá: </span>
                  <span className={cx("location-item-content")}>
                    <span className={cx("location-item-content-item")}>
                      {item.rate}
                    </span>
                  </span>
                </div>
                <div className={cx("location-item-review")}>
                  <span className={cx("location-item-title")}>Nhận xét: </span>
                  <span className={cx("location-item-content")}>
                    <span className={cx("location-item-content-item")}>
                      {item.overall_review}
                    </span>
                  </span>
                </div>

                <div className={cx("location-footer")}>
                  <button
                    className={cx("location-detail-btn")}
                    onClick={() => handleShowDetail(item)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className={cx("location-choose-btn")}
                    onClick={() => handleActiveItem(item)}
                  >
                    Chọn
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      ) : (
        <span className={cx("notify")}>Không có địa chỉ nằm trong khu vực tìm kiếm</span>
      )}

      <div className={cx("location-list-display")}>
        <span className={cx("location-list-title")}>Địa điểm vui chơi</span>
        <Paginate
          npage={npageTravel}
          handlePageClick={handlePageTravelClick}
          currentPage={currentTravelPage}
        />
      </div>
      {recordsTravel.length > 0 ? (
      <div className={cx("location-list")}>
        {recordsTravel.map((item, index) => (
          <div
            className={cx(
              "location-item",
              activeItem.some((active) => active.title === item.title)
                ? "active-item"
                : ""
            )}
            key={index}
          >
            <div className={cx("location-item-body")}>
              <div className={cx("location-item-header")}>
                <span className={cx("location-item-name")}>{item.title}</span>
              </div>
              <div className={cx("location-item-desc")}>
                <span className={cx("location-item-title")}>Mô tả: </span>
                <span className={cx("location-item-content")}>
                  {item.describe}
                </span>
                <div className={cx("location-item-review")}>
                  <span className={cx("location-item-title")}>Đánh giá: </span>
                  <span className={cx("location-item-content")}>
                    <span className={cx("location-item-content-item")}>
                      {item.rate}
                    </span>
                  </span>
                </div>
                <div className={cx("location-item-review")}>
                  <span className={cx("location-item-title")}>Nhận xét: </span>
                  <span className={cx("location-item-content")}>
                    <span className={cx("location-item-content-item")}>
                      {item.overall_review}
                    </span>
                  </span>
                </div>

                <div className={cx("location-footer")}>
                  <button
                    className={cx("location-detail-btn")}
                    onClick={() => handleShowDetail(item)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className={cx("location-choose-btn")}
                    onClick={() => handleActiveItem(item)}
                  >
                    Chọn
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      ) : (<span className={cx("notify")}>Không có địa chỉ nằm trong khu vực tìm kiếm</span>)}

      <div className={cx("btn-wrapper")}>
        <button className={cx("btn-send")} onClick={handleSearch}>
          Tìm kiếm trên bản đồ
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cx("search-icon")}
          />
        </button>
      </div>
      <DetailModal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        dataDetail={dataDetail}
      />
    </div>
  );
};

export default Home;
