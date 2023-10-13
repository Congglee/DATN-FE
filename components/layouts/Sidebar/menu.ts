import IconPhong from "@/assets/svg/menu/phong.svg";
import IconCocPhong from "@/assets/svg/menu/coc-phong.svg";
import IconTongQuan from "@/assets/svg/menu/tong-quan.svg";
import IconHoaDon from "@/assets/svg/menu/hoa-don.svg";
import IconThongKe from "@/assets/svg/menu/thong-ke.svg";
import IconDichVu from "@/assets/svg/menu/dich-vu.svg";
import IconSoDienNuoc from "@/assets/svg/menu/so-dien.svg";
import IconQuanLyThanhToan from "@/assets/svg/menu/quan-ly-thanh-toan.svg";

//route
const route = useRoute();
//state

//store

const menu = computed(() => {
  const roomId = route.params.roomId;
  return [
    {
      text: "Thống kê",
      path: `/quan-ly/${roomId}/thong-ke`,
      icon: IconThongKe,
      mainPath: "thong-ke",
    },
    {
      text: "Danh sách phòng",
      path: `/quan-ly/${roomId}/danh-sach-phong`,
      icon: IconPhong,
      mainPath: "danh-sach-phong",
    },
    {
      text: "Cọc phòng",
      path: `/quan-ly/${roomId}/coc-phong`,
      icon: IconCocPhong,
      mainPath: "coc-phong",
    },
    {
      text: "Dịch vụ",
      path: `/quan-ly/${roomId}/dich-vu`,
      icon: IconDichVu,
      mainPath: "dich-vu",
    },
    {
      text: "Số điện",
      path: `/quan-ly/${roomId}/so-dien`,
      icon: IconSoDienNuoc,
      mainPath: "so-dien",
    },
    {
      text: "Số nước",
      path: `/quan-ly/${roomId}/so-nuoc`,
      icon: IconSoDienNuoc,
      mainPath: "so-nuoc",
    },
    {
      text: "Hóa đơn hàng tháng",
      path: `/quan-ly/${roomId}/hoa-don-hang-thang`,
      icon: IconHoaDon,
      mainPath: "hoa-don-hang-thang",
    },
    {
      text: "Hóa đơn thanh lý",
      path: `/quan-ly/${roomId}/hoa-don-thanh-ly`,
      icon: IconHoaDon,
      mainPath: "hoa-don-thanh-ly",
    },
    {
      text: "Lịch sử",
      path: `/quan-ly/${roomId}/lich-su`,
      icon: IconQuanLyThanhToan,
      mainPath: "lich-su",
    },
    {
      text: "Quản lý thanh toán",
      path: `/quan-ly/${roomId}/quan-ly-thanh-toan`,
      icon: IconQuanLyThanhToan,
      mainPath: "quan-ly-thanh-toan",
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
