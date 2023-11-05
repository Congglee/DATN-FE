<script setup>
import { useForm } from "vee-validate";
import { useContractStore } from "~/store/contract";
import * as yup from "yup";
import { useToast } from "vue-toastification";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const contractStore = useContractStore();

const route = useRoute();
const toast = useToast();

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    ContractNo: yup.string().required(),
    ContractDate: yup.string().required(),
    DateStartContract: yup.string().required(),
    DateEndContract: yup.string().required(),
  }),
});

const contract = ref(null);
const contractData = reactive({
  ContractNo: defineComponentBinds("ContractNo"),
  ContractDate: defineComponentBinds("ContractDate"),
  DateStartContract: defineComponentBinds("DateStartContract"),
  DateEndContract: defineComponentBinds("DateEndContract"),
});

if (props.roomInfo.contractId?.content) {
  contract.value = props.roomInfo.contractId.content;
}

const handleCreateNewContract = handleSubmit(async () => {
  const payload = {
    ContractNo: contractData.ContractNo.modelValue,
    ContractDate: convertDateType(
      contractData.ContractDate.modelValue,
      "DD/MM/YYYY"
    ),
    DateStartContract: convertDateType(
      contractData.DateStartContract.modelValue,
      "DD/MM/YYYY"
    ),
    DateEndContract: convertDateType(
      contractData.DateEndContract.modelValue,
      "DD/MM/YYYY"
    ),
  };
  const res = await contractStore.createNewContractByRoom(
    removeEmptyFields(payload),
    route.params.roomId
  );
  if (res.data) {
    contract.value = res.data.contract.content;
  }
});

async function handleExport() {
  // await handleSelectedList();
  let text = "";
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML =
    header + document.getElementById("exportAll").innerHTML + footer;
  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = "document.doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}
</script>
<template>
  <div class="tw-text-center tw-flex tw-justify-center" v-if="!contract">
    <div class="tw-pb-[300px]">
      <span class="tw-text-[24px] tw-font-bold">Tạo hợp đồng</span>
      <div class="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-4">
        <div class="tw-max-w-[300px]">
          <g-input
            label="Hợp đồng số"
            required
            v-bind="contractData.ContractNo"
            :error="errors.ContractNo"
          ></g-input>
        </div>
        <div>
          <g-date-picker
            label="Ngày kí kết"
            required
            v-bind="contractData.ContractDate"
            :error="errors.ContractDate"
          ></g-date-picker>
        </div>
        <div>
          <g-date-picker
            label="Ngày bắt đầu hợp đồng"
            required
            v-bind="contractData.DateStartContract"
            :error="errors.DateStartContract"
          ></g-date-picker>
        </div>
        <div>
          <g-date-picker
            label="Ngày kết thúc hợp đồng"
            required
            v-bind="contractData.DateEndContract"
            :error="errors.DateEndContract"
          ></g-date-picker>
        </div>
      </div>
      <g-button class="tw-mt-3" @click="handleCreateNewContract"
        >Tạo hợp đồng</g-button
      >
    </div>
  </div>
  <div v-else class="tw-flex tw-flex-col tw-gap-y-3">
    <quill-editor
      id="exportAll"
      v-model:content="contract"
      contentType="html"
      toolbar="full"
      theme="snow"
      class=""
    />
    <g-button class="tw-w-[150px]" @click="handleExport">Tải hợp đồng</g-button>
  </div>
</template>
