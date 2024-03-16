import currency from 'currency.js';
import { isArray, isObject } from 'lodash';

/* common function */
export const calculate = {
  add: (firstValue, secondValue) => {
    return currency(firstValue).add(secondValue).value;
  },
  sub: (firstValue, secondValue) => {
    return currency(firstValue).subtract(secondValue).value;
  },
  multiply: (firstValue, secondValue) => {
    return currency(firstValue).multiply(secondValue).value;
  },
  divide: (firstValue, secondValue) => {
    return currency(firstValue).divide(secondValue).value;
  },
};

export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/* Make id function */
export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
};

export function makeidEvent(length = 32) {
  let result = '',
    counter = 0;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    if (counter % 4 === 3 && counter !== length - 1) result += '_';
    counter += 1;
  }
  return result;
}

/* Handle object and array */
export function cleanArray(actual) {
  let newArray = new Array();
  for (let i = 0; i < actual.length; i++) {
    // check if item in array not null or not undefined => push to new array
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export const removeEmptyArray = (arr) =>
  arr.filter((element) => {
    if (isObject(element) && !isArray(element) && Object.keys(element).length === 0) return false;
    else return true;
  });

export const getIndexFormArray = (arr = [], arrCom = []) => {
  let res = [];
  arr.forEach((el) => {
    res.push(arrCom.indexOf(el));
  });
  return res.filter((item) => item !== -1);
};

// handle multi-media
export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUploadImage = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  // return isJpgOrPng && isLt2M;
  return isJpgOrPng;
};

export const beforeUploadIcon = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // const isLt1K = file.size < 1024;
  // if (!isLt1K) {
  //   message.error('Image must smaller than 1KB!');
  // }
  // return isJpgOrPng && isLt1K;
  return isJpgOrPng;
};

export const beforeUploadMedia = (type, file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/JPEG file!');
  }

  return isJpgOrPng;

  // return new Promise((resolve, reject) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //     return reject(false);
  //   }
  //   let checkSize = false;
  //   let width = 0,
  //     height = 0;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.addEventListener('load', (event) => {
  //     const _loadedImageUrl = event.target.result;
  //     const image = document.createElement('img');
  //     image.src = _loadedImageUrl;
  //     image.addEventListener('load', () => {
  //       width = image.width;
  //       height = image.height;
  //       if (type && type === STATS_UPLOAD_MEDIA.MOBILE_D) {
  //         checkSize = file.size < STATS_UPLOAD_MEDIA.MOBILE_SIZE;
  //         if (!checkSize) {
  //           message.error('Image must smaller than 50KB!');
  //           return reject(false);
  //         }
  //         if (width > STATS_UPLOAD_MEDIA.MOBILE_WIDTH_D || height > STATS_UPLOAD_MEDIA.MOBILE_HEIGHT_D) {
  //           message.error(`Max resolution Width x Height - ${STATS_UPLOAD_MEDIA.MOBILE_WIDTH_D}px X ${STATS_UPLOAD_MEDIA.MOBILE_HEIGHT_D}px!`);
  //           return reject(false);
  //         }
  //       } else if (type && type === STATS_UPLOAD_MEDIA.MOBILE_N) {
  //         checkSize = file.size < STATS_UPLOAD_MEDIA.MOBILE_SIZE;
  //         if (!checkSize) {
  //           message.error('Image must smaller than 50KB!');
  //           return reject(false);
  //         }
  //         if (width > STATS_UPLOAD_MEDIA.MOBILE_WIDTH_N || height > STATS_UPLOAD_MEDIA.MOBILE_HEIGHT_N) {
  //           message.error(`Max resolution Width x Height - ${STATS_UPLOAD_MEDIA.MOBILE_WIDTH_N}px X ${STATS_UPLOAD_MEDIA.MOBILE_HEIGHT_N}px!`);
  //           return reject(false);
  //         }
  //       } else if (type && type === STATS_UPLOAD_MEDIA.TV) {
  //         checkSize = file.size < STATS_UPLOAD_MEDIA.TV_SIZE;
  //         if (!checkSize) {
  //           message.error('Image must smaller than 150KB!');
  //           return reject(false);
  //         }
  //         if (width > STATS_UPLOAD_MEDIA.TV_WIDTH || height > STATS_UPLOAD_MEDIA.TV_HEIGHT) {
  //           message.error(`Max resolution Width x Height - ${STATS_UPLOAD_MEDIA.TV_WIDTH}px X ${STATS_UPLOAD_MEDIA.TV_HEIGHT}px!`);
  //           return reject(false);
  //         }
  //       } else if (type && type === STATS_UPLOAD_MEDIA.ICON) {
  //         checkSize = file.size < STATS_UPLOAD_MEDIA.ICON_SIZE;
  //         if (!checkSize) {
  //           message.error('Image must smaller than 5KB!');
  //           return reject(false);
  //         }
  //         if (width > STATS_UPLOAD_MEDIA.ICON_WIDTH || height > STATS_UPLOAD_MEDIA.ICON_HEIGHT) {
  //           message.error(`Max resolution Width x Height - ${STATS_UPLOAD_MEDIA.ICON_WIDTH}px X ${STATS_UPLOAD_MEDIA.ICON_HEIGHT}px!`);
  //           return reject(false);
  //         }
  //       }
  //       return resolve(true);
  //     });
  //   });
  // });
};
export const convertDataCheckbox = (value) => {
  switch (value) {
    case 'readable':
      return 'Danh sách';
    case 'addable':
      return 'Thên mới';
    case 'editable':
      return 'Chỉnh sửa';
    case 'approveable':
      return 'Cấp quyền';
  }
};

export const convertValueCheckbox = (value) => {
  switch (value) {
    case 'readable':
      return 'can_read';
    case 'addable':
      return 'can_add';
    case 'editable':
      return 'can_edit';
    case 'approveable':
      return 'can_approve';
  }
};
