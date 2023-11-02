import IconPhong from "@/assets/svg/menu/phong.svg";
import IconCocPhong from "@/assets/svg/menu/coc-phong.svg";
import IconTongQuan from "@/assets/svg/menu/tong-quan.svg";
import IconHoaDon from "@/assets/svg/menu/hoa-don.svg";
import IconThongKe from "@/assets/svg/menu/thong-ke.svg";
import IconDichVu from "@/assets/svg/menu/dich-vu.svg";
import IconSoDienNuoc from "@/assets/svg/menu/so-dien.svg";
import IconQuanLyThanhToan from "@/assets/svg/menu/quan-ly-thanh-toan.svg";
import IconEditUser from "@/assets/svg/menu/edit-user.svg";

//route
const route = useRoute();
//state

//store

const menu = computed(() => {
  const motelId = route.params.motelId;
  return [
    {
      text: "Thống kê",
      path: `/quan-ly/${motelId}/thong-ke`,
      icon: IconThongKe,
      mainPath: "thong-ke",
    },
    {
      text: "Danh sách phòng",
      path: `/quan-ly/${motelId}/danh-sach-phong`,
      icon: IconPhong,
      mainPath: "danh-sach-phong",
    },
    {
      text: "Cọc phòng",
      path: `/quan-ly/${motelId}/coc-phong`,
      icon: IconCocPhong,
      mainPath: "coc-phong",
    },
    {
      text: "Dịch vụ",
      path: `/quan-ly/${motelId}/dich-vu`,
      icon: IconDichVu,
      mainPath: "dich-vu",
    },
    {
      text: "Số điện",
      path: `/quan-ly/${motelId}/so-dien`,
      icon: IconSoDienNuoc,
      mainPath: "so-dien",
    },
    {
      text: "Số nước",
      path: `/quan-ly/${motelId}/so-nuoc`,
      icon: IconSoDienNuoc,
      mainPath: "so-nuoc",
    },
    {
      text: "Hóa đơn hàng tháng",
      path: `/quan-ly/${motelId}/hoa-don-hang-thang`,
      icon: IconHoaDon,
      mainPath: "hoa-don-hang-thang",
    },
    {
      text: "Hóa đơn thanh lý",
      path: `/quan-ly/${motelId}/hoa-don-thanh-ly`,
      icon: IconHoaDon,
      mainPath: "hoa-don-thanh-ly",
    },
    {
      text: "Lịch sử",
      path: `/quan-ly/${motelId}/lich-su`,
      icon: IconQuanLyThanhToan,
      mainPath: "lich-su",
    },
    {
      text: "Quản lý thanh toán",
      path: `/quan-ly/${motelId}/quan-ly-thanh-toan`,
      icon: IconQuanLyThanhToan,
      mainPath: "quan-ly-thanh-toan",
    },
    {
      text: "Thông tin người dùng",
      path: `/quan-ly/${motelId}/thong-tin-nguoi-dung`,
      icon: IconEditUser,
      mainPath: "thong-tin-nguoi-dung",
    },
    {
      text: "Thiết lập",
      path: `/quan-ly/${motelId}/thiet-lap`,
      icon: IconQuanLyThanhToan,
      mainPath: "thiet-lap",
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
