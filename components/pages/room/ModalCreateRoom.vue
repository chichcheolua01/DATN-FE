<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import IconRequired from "@/assets/svg/required.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useRoomStore } from "~/store/room";
//props
const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

console.log(props.roomInfo);

//composable
const toast = useToast();
const route = useRoute();
const fetchListRoomEventBus = useEventBus(
  `fetch-list-room-${route.params.motelId}`
);

//emit

const emit = defineEmits("close");

//store

const roomStore = useRoomStore();

//state

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().trim().required(),
    // motelId: yup.string().trim().required(),
    price: yup.number().required(),
    max_customer: yup.number().required(),
    area: yup.string(),
  }),
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  price: defineComponentBinds("price"),
  max_customer: defineComponentBinds("max_customer"),
  area: defineComponentBinds("area"),
});

const formData = reactive({
  description: props.roomInfo.description,
});

const loading = ref(false)

//methods

const createRoom = handleSubmit(async () => {
    loading.value = true
  const payload = {
    ...values,
    ...formData,
    motelId: route.params.motelId,
  };
  console.log(payload);
  const res = await roomStore.createRoom(payload);
  if (res.data) {
    fetchListRoomEventBus.emit();
    toast.success("Tạo phòng thành công!");
    loading.value = false
    emit("close");
  }
  if (res.error) {
    toast.error(res.error.data.message.verify_code);
  }
});
</script>
<template>
  <div class="modal-change-information">
    <div class="">
      <button
        @click="emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Chỉnh sửa thông tin phòng
      </h5>
      <p class="tw-text-[15px] tw-leading-5 tw-text-center">
        A message should be a short, complete sentence.
      </p>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input
          label="Tên phòng"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Giá phòng"
          required
          v-bind="validateFormData.price"
          :error="errors.name"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Số người tối đa"
          required
          v-bind="validateFormData.max_customer"
          :error="errors.max_customer"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Diện tích"
          required
          v-bind="validateFormData.area"
          :error="errors.area"
        >
        </g-input>
        <div class="tw-gap-y-1 tw-grid tw-pt-4">
          <p>Ghi chú</p>
          <textarea
            v-model="formData.description"
            class="tw-resize-none tw-rounded-[10px] tw-bg-white tw-outline tw-p-3 !tw-outline-[#c0c0c0] tw-outline-[1px] focus:!tw-outline-[#f88125] tw-w-full tw-h-[158px] focus:!tw-shadow-[0px_0px_0px_2px_rgba(248,129,37,0.2)]"
          ></textarea>
        </div>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
      <g-button @click="createRoom" :loading="loading">Tạo</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>