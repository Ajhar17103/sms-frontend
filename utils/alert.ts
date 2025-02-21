// utils/alert.ts
"use client";

import Swal from "sweetalert2";

export const showSuccessAlert = (message: string, title = "Success") => {
  Swal.fire({
    title,
    text: message,
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  });
};

export const showErrorAlert = (message: string, title = "Error") => {
  Swal.fire({
    title,
    text: message,
    icon: "error",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  });
};

export const showInfoAlert = (message: string, title = "Info") => {
  Swal.fire({
    title,
    text: message,
    icon: "info",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  });
};

export const showWarningAlert = (message: string, title = "Warning") => {
  Swal.fire({
    title,
    text: message,
    icon: "warning",
    confirmButtonColor: "#f39c12",
    confirmButtonText: "OK",
  });
};

export const showConfirmDialog = async (message: string, title = "Are you sure?") => {
	const result = await Swal.fire({
	  title,
	  text: message,
	  icon: "warning",
	  showCancelButton: true,
	  confirmButtonColor: "#3085d6",
	  cancelButtonColor: "#d33",
	  confirmButtonText: "Yes, proceed!",
	});
  
	return result.isConfirmed; // Returns true if the user clicks "Yes"
  };
  
