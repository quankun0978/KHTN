/* This file contains constant variables for helper functions */

export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const REGEX_PHONE_NUMBER = /^\+?(?:[0-9]??).{9,12}[0-9]$/;

export const REGEX_ALPHABET_LESS_THAN_11 = /^[a-zA-Z]{1,10}$/;
