import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import theme from "../../theme";
import {Select} from "@mui/material";

export const FormTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
    width: '300px',
    marginBottom: '1rem'
  },
}));

export const FormSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-root': {
    color: '#000', // Text color for the selected item
    backgroundColor: '#F3F4F6', // Background color for the dropdown
    borderRadius: '4px', // Same border radius as FormTextField
    '&:focus': {
      backgroundColor: '#FFF', // Change background color when focused (optional)
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E0E3E7', // Border color for the input
    '&:hover': {
      borderColor: '#B2BAC2', // Border color on hover
    },
    '&.Mui-focused': {
      borderColor: '#6F7E8C', // Border color when focused
    },
  },
  width: '300px',
  marginBottom: '1rem',
}));





