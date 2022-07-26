import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
}                        from "@mui/material";
import React, {useState} from "react";
import "./Styles/Dialog.scss";

export const UnblockDialog = (props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    itemToUnblock,
    onConfirmUnblock,
    disableButton,
    buttonClassName,
    buttonSize,
  } = props;
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmBlock = async () => {
    await onConfirmUnblock();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="success"
            size={buttonSize ? buttonSize : "small"}
            onClick={handleDeleteClick}
            disabled={disableButton}
        >
          <AccessibilityNewIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="darkred">
            Are you sure you want to unblock this {itemToUnblock}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action will unblock {itemToUnblock}.
              <br />
              Obviously you can block them again :)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                className="dialog-action-button"
                onClick={handleDialogClose}
                autoFocus={true}
                variant="outlined"
            >
              Cancel
            </Button>
            <Button
                className="dialog-action-button"
                onClick={handleConfirmBlock}
                color="success"
                variant="outlined"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};
