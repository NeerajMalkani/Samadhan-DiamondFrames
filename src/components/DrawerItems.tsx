import { Dispatch, SetStateAction } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Diamond from "@mui/icons-material/Diamond";
import Group from "@mui/icons-material/Group";
import LocalOffer from "@mui/icons-material/LocalOffer";
import InsertComment from "@mui/icons-material/InsertComment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme/AppTheme";

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
          isActive: window.location.href.toLowerCase().includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/activity`);
            }, 300);
          },
        },
        {
          title: "Service",
          isActive: window.location.href.toLowerCase().includes("service"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/service`);
            }, 300);
          },
        },
        {
          title: "Unit of Sales",
          isActive: window.location.href.toLowerCase().includes("unit"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/unit`);
            }, 300);
          },
        },
        {
          title: "Category",
          isActive: window.location.href.toLowerCase().includes("category"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/category`);
            }, 300);
          },
        },
        { title: "Products", isActive: window.location.href.toLowerCase().includes("products") },
        { title: "Service Product", isActive: window.location.href.toLowerCase().includes("serviceproduct") },
        { title: "Department", isActive: window.location.href.toLowerCase().includes("department") },
        { title: "Location Type", isActive: window.location.href.toLowerCase().includes("locationtype") },
        { title: "Designation", isActive: window.location.href.toLowerCase().includes("designation") },
        { title: "E-Way Bill", isActive: window.location.href.toLowerCase().includes("ewaybill") },
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
          <AccordionDetails style={{ padding: 0 }}>
            {item.items &&
              item.items.map((listItem, index) => {
                return (
                  <Box key={index}>
                    <ListItemButton selected={listItem.isActive} sx={{ minHeight: 48, justifyContent: "initial", px: 2.5, backgroundColor: listItem.isActive ? theme.palette.primary.main + " !important" : "#ededed" }} onClick={listItem.navigation}>
                      <ListItemText primary={listItem.title} sx={{ opacity: 1, color: listItem.isActive ? theme.palette.primary.contrastText : theme.palette.text.primary }} />
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
