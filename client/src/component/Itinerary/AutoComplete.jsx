import {
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";

const AutoComplete = ({
  query,
  suggestions,
  activeIndex,
  onChange,
  onSelect,
  onKeyDown,
  suggestionStyles,
  placeholder = "Enter location",
}) => {
  return (
    <Paper elevation={0} sx={{ mb: 2, background: "none" }}>
      <TextField
        fullWidth
        size="small"
        label="Location"
        name="location"
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        sx={{ mb: suggestions?.length ? 0 : 2 }}
      />
      {suggestions && suggestions.length > 0 && (
        <List
          sx={{
            ...suggestionStyles,
            maxHeight: 200,
            overflowY: "auto",
            border: "1px solid #eee",
            borderRadius: 1,
            mt: 0.5,
          }}
        >
          {suggestions.map((suggestion, idx) => (
            <ListItem key={suggestion} disablePadding>
              <ListItemButton
                selected={idx === activeIndex}
                onClick={() => onSelect(suggestion)}
              >
                <ListItemText primary={suggestion} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default AutoComplete;
