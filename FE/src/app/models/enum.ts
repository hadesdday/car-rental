export enum OTPType {
  REGISTER = 'REGISTER',
  FORGET_PASSWORD = 'FORGET_PASSWORD',
}
export enum OAuthProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  APPLICATION = 'APPLICATION',
}
export enum GENDER {
  MALE,
  FEMALE,
}
export enum StandardStatus {
  ACTIVATED,
  UNACTIVATED,
}

export enum ServiceType {
  SELF_DRIVING = 1,
  WITH_DRIVER_DOMESTIC,
  WITH_DRIVER_INTERSTATE
}

export enum RentalStatus {
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  RENTED = 'RENTED',
  COMPLETED = 'COMPLETED'
}

export enum RentalStatusVie {
  CANCELLED = 'Đã hủy',
  REJECTED = 'Đã từ chối',
  PENDING = 'Đang chờ duyệt',
  ACCEPTED = 'Đã xác nhận',
  RENTED = 'Đã được thuê',
  COMPLETED = 'Đã hoàn thành'
}

export enum CarStatus {
  BANNED = 'BANNED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  BUSY = 'BUSY',
  RENTED = 'RENTED'
}

export enum CarStatusVie {
  BANNED = 'Tạm khóa',
  PENDING_APPROVAL = 'Chờ duyệt',
  ACTIVE = 'Đang hoạt động',
  BUSY = 'Bận',
  RENTED = 'Đã được thuê'
}

export enum RepeatedCalendarType {
  PRICE,
  BUSY_DATE
}

export enum RepeatedCalendarPriority {
  EVERYDAY,
  ONEDAY
}