import BlockIcon         from '@mui/icons-material/Block';
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

export const BlockDialog = (props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    itemToBlock,
    onConfirmBlock,
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
    await onConfirmBlock();
    handleDialogClose();
  };
  return (
      <Box className="dialog-box">
        <IconButton
            className={`dialog-action-button ${buttonClassName}`}
            color="error"
            size={buttonSize ? buttonSize : "small"}
            onClick={handleDeleteClick}
            disabled={disableButton}
        >
          <BlockIcon fontSize="large" />
        </IconButton>
        <Dialog
            className="dialog"
            open={isDialogOpen}
            onClose={handleDialogClose}
        >
          <DialogTitle color="darkred">
            Are you sure you want to block this {itemToBlock}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action will block {itemToBlock}.
              <br />
              This action can be undone.
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
                color="error"
                variant="outlined"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};
