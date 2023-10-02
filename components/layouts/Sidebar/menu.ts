// import IconTongQuan from "@/assets/svg/tong-quan.svg";

//route
const route = useRoute();
console.log(route.params.roomId)
//state

//store

const menu = computed(() => {
  const roomId = route.params.roomId;
  return [
    {
      text: "Thống kê",
      path: `/quan-ly/${roomId}/thong-ke`,
      //   icon: IconTongQuan,
    },
    {
      text: "Phòng",
      path: `/quan-ly/${roomId}/phong`,
      //   icon: IconTongQuan,
    },
    {
      text: "Cọc phòng",
      path: `/quan-ly/${roomId}/coc-phong`,
      //   icon: IconTongQuan,
    },
    {
      text: "Dịch vụ",
      path: `/quan-ly/${roomId}/dich-vu`,
      //   icon: IconTongQuan,
    },
    {
      text: "Số điện",
      path: `/quan-ly/${roomId}/so-dien`,
      //   icon: IconTongQuan,
    },
    {
      text: "Số nước",
      path: `/quan-ly/${roomId}/so-nuoc`,
      //   icon: IconTongQuan,
    },
    {
      text: "Hóa đơn hàng tháng",
      path: `/quan-ly/${roomId}/hoa-don-hang-thang`,
      //   icon: IconTongQuan,
    },
    {
      text: "Hóa đơn thanh lý",
      path: `/quan-ly/${roomId}/hoa-don-thanh-ly`,
      //   icon: IconTongQuan,
    },
    {
      text: "Lịch sử",
      path: `/quan-ly/${roomId}/lich-su`,
      //   icon: IconTongQuan,
    },
    {
      text: "Quản lý thanh toán",
      path: `/quan-ly/${roomId}/quan-ly-thanh-toan`,
      //   icon: IconTongQuan,
    },
  ];
});

const listMenu = computed(() => {
  const path = route.path;
  if (path.startsWith("")) {
    return menu.value;
  }
  return [];
});

export default listMenu;
