import { Dispatch, SetStateAction } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Diamond from "@mui/icons-material/Diamond";
import Group from "@mui/icons-material/Group";
import LocalOffer from "@mui/icons-material/LocalOffer";
import InsertComment from "@mui/icons-material/InsertComment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

interface OpenObj {
  open: [boolean, Dispatch<SetStateAction<boolean>>];
}

const DrawerItems = ({ open }: OpenObj) => {
  const navigate = useNavigate();
  const arrItems = [
    {
      title: "Master",
      icon: <Diamond />,
      expanded: true,
      items: [
        {
          title: "Activity",
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/activity`);
            }, 300);
          },
        },
        { title: "Service" },
        { title: "Unit of Sales" },
        { title: "Category" },
        { title: "Products" },
        { title: "Service Product" },
        { title: "Department" },
        { title: "Location Type" },
        { title: "Designation" },
        { title: "E-Way Bill" },
      ],
    },
    { title: "Users", icon: <Group />, expanded: false },
    { title: "Service Catalogue", icon: <LocalOffer />, expanded: false },
    { title: "Enquiries & Status", icon: <InsertComment />, expanded: false },
  ];
  return (
    <Box sx={{ mt: 8, width: 280 }}>
      {arrItems.map((item, index) => (
        <Accordion key={index} style={{ margin: 0, boxShadow: "none", border: "none", position: "unset" }} defaultExpanded={item.expanded}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={item.title} id={item.title} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: "center" }}>{item.icon}</ListItemIcon>
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0, backgroundColor: "#ededed" }}>
            {item.items &&
              item.items.map((listItem, index) => {
                return (
                  <Box key={index}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: "initial", px: 2.5 }} onClick={listItem.navigation}>
                      <ListItemText primary={listItem.title} sx={{ opacity: 1 }} />
                    </ListItemButton>
                    <Divider />
                  </Box>
                );
              })}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default DrawerItems;
