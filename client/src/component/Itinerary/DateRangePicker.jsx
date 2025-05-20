import { Stack, TextField, InputAdornment } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';

const DateRangePicker = ({ startDate, endDate, onChange }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
      <TextField
        size="small"
        label="Start Date"
        name="startDate"
        type="date"
        value={startDate}
        onChange={onChange}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DateRangeIcon sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ 
          shrink: true
        }}
        sx={{
          '& input': {
            cursor: 'pointer',
            color: 'inherit'
          },
          '& input[type="date"]::-webkit-calendar-picker-indicator': {
            position: 'absolute',
            right: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }
        }}
      />
      <TextField
        size="small"
        label="End Date"
        name="endDate"
        type="date"
        value={endDate}
        onChange={onChange}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DateRangeIcon sx={{ color: 'action.active' }} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ 
          shrink: true
        }}
        sx={{
          '& input': {
            cursor: 'pointer',
            color: 'inherit'
          },
          '& input[type="date"]::-webkit-calendar-picker-indicator': {
            position: 'absolute',
            right: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }
        }}
      />
    </Stack>
  );
};

export default DateRangePicker;