import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Diamond from "@mui/icons-material/Diamond";
import Group from "@mui/icons-material/Group";
import LocalOffer from "@mui/icons-material/LocalOffer";
import InsertComment from "@mui/icons-material/InsertComment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme/AppTheme";
import { useCookies } from "react-cookie";

interface OpenObj {
  open: [boolean, Dispatch<SetStateAction<boolean>>];
}

const DrawerItems = ({ open }: OpenObj) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dfc"]);
  const [CookieRoleID, SetCookieRoleID] = useState(0);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID)
      navigate(`/Samadhan-DiamondFrames/login`);
    else {
      SetCookieRoleID(cookies.dfc.RoleID);
    }
  }, []);

  const MenuItemsAdmin = [
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
        {
          title: "Products",
          isActive: window.location.href.toLowerCase().includes("product"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/product`);
            }, 300);
          },
        },
        {
          title: "Service Product",
          isActive: window.location.href
            .toLowerCase()
            .includes("serviceproduct"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/serviceproduct`);
            }, 300);
          },
        },
        {
          title: "Department",
          isActive: window.location.href.toLowerCase().includes("department"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/department`);
            }, 300);
          },
        },
        {
          title: "Location Type",
          isActive: window.location.href.toLowerCase().includes("locationtype"),
        },
        {
          title: "Designation",
          isActive: window.location.href.toLowerCase().includes("designation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/designation`);
            }, 300);
          },
        },
        {
          title: "E-Way Bill",
          isActive: window.location.href.toLowerCase().includes("ewaybill"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/ewaybill`);
            }, 300);
          },
        },
      ],
    },
    { title: "Users", icon: <Group />, expanded: false },
    { title: "Service Catalogue", icon: <LocalOffer />, expanded: false },
    { title: "Enquiries & Status", icon: <InsertComment />, expanded: false },
  ];

  const MenuItemsGeneralUser = [
    {
      title: "Brands & Prodcuts",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Image Gallery",
          isActive: window.location.href.toLowerCase().includes("imagegallery"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/imagegallery`);
            }, 300);
          },
        },
        {
          title: "Your Estimations",
          isActive: window.location.href.toLowerCase().includes("estimation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/estimation`);
            }, 300);
          },
        },
      ],
    },
  ];

  const MenuItemsDealer = [
    {
      title: "Company Profile",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Basic Details",
          isActive: window.location.href.toLowerCase().includes("basicdetails"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/basicdetails`);
            }, 300);
          },
        },
        {
          title: "My Services",
          isActive: window.location.href.toLowerCase().includes("myservice"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/myservice`);
            }, 300);
          },
        },
        {
          title: "Presentation",
          isActive: window.location.href.toLowerCase().includes("presentation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/presentation`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Brand & Product",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Brand Master",
          isActive: window.location.href.toLowerCase().includes("brandmaster"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/brandmaster`);
            }, 300);
          },
        },
        {
          title: "Brand",
          isActive: window.location.href.toLowerCase().includes("brand"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/brand`);
            }, 300);
          },
        },
        {
          title: "Product",
          isActive: window.location.href.toLowerCase().includes("product"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/product`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Employee",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Employee New / List",
          isActive: window.location.href.toLowerCase().includes("employee"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/employee`);
            }, 300);
          },
        },
        {
          title: "Employee Report",
          isActive: window.location.href
            .toLowerCase()
            .includes("employeereport"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/employeereport`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Organization",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Add Department",
          isActive: window.location.href
            .toLowerCase()
            .includes("adddepartment"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/adddepartment`);
            }, 300);
          },
        },
        {
          title: "Add Branch",
          isActive: window.location.href.toLowerCase().includes("addbranch"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/addbranch`);
            }, 300);
          },
        },
        {
          title: "Add Designation",
          isActive: window.location.href
            .toLowerCase()
            .includes("adddesignation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/adddesignation`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Client",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Client List",
          isActive: window.location.href.toLowerCase().includes("clientlist"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/clientlist`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Purchase",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Create Purchase Order",
          isActive: window.location.href
            .toLowerCase()
            .includes("purchaseorder"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/purchaseorder`);
            }, 300);
          },
        },
      ],
    },
  ];

  const MenuItemsContractor = [
    {
      title: "Company Profile",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Basic Details",
          isActive: window.location.href.toLowerCase().includes("basicdetails"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/basicdetails`);
            }, 300);
          },
        },
        {
          title: "My Services",
          isActive: window.location.href.toLowerCase().includes("myservices"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/myservices`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Employee",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Employee New / List",
          isActive: window.location.href.toLowerCase().includes("employee"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/employee`);
            }, 300);
          },
        },
        {
          title: "Employee Report",
          isActive: window.location.href
            .toLowerCase()
            .includes("employeereport"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/employeereport`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Organization",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Add Department",
          isActive: window.location.href
            .toLowerCase()
            .includes("adddepartment"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/adddepartment`);
            }, 300);
          },
        },
        {
          title: "Add Branch",
          isActive: window.location.href.toLowerCase().includes("addbranch"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/addbranch`);
            }, 300);
          },
        },
        {
          title: "Add Designation",
          isActive: window.location.href
            .toLowerCase()
            .includes("adddesignation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/adddesignation`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Rate Card",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Rate Card Setup",
          isActive: window.location.href
            .toLowerCase()
            .includes("ratecardsetup"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/ratecardsetup`);
            }, 300);
          },
        },
        {
          title: "Send Rate Card",
          isActive: window.location.href.toLowerCase().includes("sendratecard"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/sendratecard`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Client",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Client List",
          isActive: window.location.href.toLowerCase().includes("clientlist"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/clientlist`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Quotation & Enquiries",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "App User Enquiry Wise",
          isActive: window.location.href
            .toLowerCase()
            .includes("appuserenquirywise"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/appuserenquirywise`);
            }, 300);
          },
        },
        {
          title: "Contractor Design Wise",
          isActive: window.location.href
            .toLowerCase()
            .includes("contractordesignwise"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/contractordesignwise`);
            }, 300);
          },
        },
        {
          title: "Contractor Quotation Wise",
          isActive: window.location.href
            .toLowerCase()
            .includes("contractorquotationwise"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(
                `/Samadhan-DiamondFrames/master/contractorquotationwise`
              );
            }, 300);
          },
        },
      ],
    },
    {
      title: "Projects",
      icon: "gift-outline",
      expanded: true,
      items: [
        {
          title: "Yet Start",
          isActive: window.location.href.toLowerCase().includes("yetstart"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/yetstart`);
            }, 300);
          },
        },
        {
          title: "On Going",
          isActive: window.location.href.toLowerCase().includes("ongoing"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/ongoing`);
            }, 300);
          },
        },
        {
          title: "Completed",
          isActive: window.location.href.toLowerCase().includes("completed"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/Samadhan-DiamondFrames/master/completed`);
            }, 300);
          },
        },
      ],
    },
  ];

  let MenuArr: Array<any> = [];

  switch (CookieRoleID) {
    case 1:
      MenuArr = [...MenuItemsAdmin];
      break;
    case 2:
      MenuArr = [...MenuItemsGeneralUser];
      break;
    case 3:
      MenuArr = [...MenuItemsDealer];
      break;
    case 4:
      MenuArr = [...MenuItemsContractor];
      break;
  }

  return (
    <Box sx={{ mt: 8, width: 280 }}>
      {MenuArr.map((item, index) => (
        <Accordion
          key={index}
          style={{
            margin: 0,
            boxShadow: "none",
            border: "none",
            position: "unset",
          }}
          defaultExpanded={item.expanded}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={item.title}
            id={item.title}
            style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: "center" }}>
              {item.icon}
            </ListItemIcon>
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            {item.items &&
              item.items.map((listItem: any, index: number) => {
                return (
                  <Box key={index}>
                    <ListItemButton
                      selected={listItem.isActive}
                      sx={{
                        minHeight: 48,
                        justifyContent: "initial",
                        px: 2.5,
                        backgroundColor: listItem.isActive
                          ? theme.palette.primary.main + " !important"
                          : "#ededed",
                      }}
                      onClick={listItem.navigation}
                    >
                      <ListItemText
                        primary={listItem.title}
                        sx={{
                          opacity: 1,
                          color: listItem.isActive
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.primary,
                        }}
                      />
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
