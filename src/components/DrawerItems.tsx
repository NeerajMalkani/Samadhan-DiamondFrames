import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Diamond from "@mui/icons-material/Diamond";
import Group from "@mui/icons-material/Group";
import LocalOffer from "@mui/icons-material/LocalOffer";
import InsertComment from "@mui/icons-material/InsertComment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HailIcon from "@mui/icons-material/Hail";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import ShopIcon from "@mui/icons-material/Shop";
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
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    if (!cookies || !cookies.dfc || !cookies.dfc.UserID) navigate(`/login`);
    else {
      SetCookieRoleID(cookies.dfc.RoleID);
    }
  }, []);

  const GetSearchedText = (mainStr: string, searchedText: string) => {
    if (mainStr !== null && searchedText !== null) {
      let arrStr = mainStr.split("/");
      return arrStr[arrStr.length - 1] === searchedText;
    } else return false;
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const MenuItemsAdmin = [
    {
      title: "Master",
      icon: <Diamond />,
      expanded: true,
      items: [
        {
          title: "Activity",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "activity"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/activity`);
            }, 300);
          },
        },
        {
          title: "Service",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "service"), //.includes("service"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/service`);
            }, 300);
          },
        },
        {
          title: "Unit of Sales",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "unit"), //.includes("unit"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/unit`);
            }, 300);
          },
        },
        {
          title: "Category",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "category"), // .includes("category"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/category`);
            }, 300);
          },
        },
        {
          title: "Products",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "product"), //.includes("product"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/product`);
            }, 300);
          },
        },
        {
          title: "Service Product",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "serviceproduct"), //  .includes("serviceproduct"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/serviceproduct`);
            }, 300);
          },
        },
        {
          title: "Department",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "department"), // .includes("department"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/department`);
            }, 300);
          },
        },
        {
          title: "Location Type",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "locationtype"), // .includes("locationtype"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/locationtype`);
            }, 300);
          },
        },
        {
          title: "Designation",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "designation"), // .includes("designation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/designation`);
            }, 300);
          },
        },
        {
          title: "E-Way Bill",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "ewaybill"), // includes("ewaybill"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/ewaybill`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Users",
      icon: <Group />,
      expanded: true,
      items: [
        {
          title: "Pending",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "pending"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/user/pending`);
            }, 300);
          },
        },
        {
          title: "Approved",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "approved"), //.includes("service"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/user/approved`);
            }, 300);
          },
        },
        {
          title: "Declined",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "declined"), //.includes("unit"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/user/declined`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Service Catalogue",
      icon: <LocalOffer />,
      expanded: false,
      items: [
        {
          title: "Work Floor",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "workfloor"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/servicecatalogue/workfloor`);
            }, 300);
          },
        },
        {
          title: "Work Location",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "worklocation"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/servicecatalogue/worklocation`);
            }, 300);
          },
        },
        {
          title: "Design Type",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "designtype"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/servicecatalogue/designtype`);
            }, 300);
          },
        },
        {
          title: "Materials Setup",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "materialssetup"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/servicecatalogue/materialssetup`);
            }, 300);
          },
        },
        {
          title: "Post New Design",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "postnewdesign"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/servicecatalogue/postnewdesign`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Enquiries & Status",
      icon: <InsertComment />,
      expanded: false,
      items: [
        {
          title: "General Enquiry",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "generalenquiry"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/enquiriesandstatus/generalenquiry`);
            }, 300);
          },
        },
        {
          title: "BOQ Enquiry",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "boqenquiry"), //.includes("activity"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/enquiriesandstatus/boqenquiry`);
            }, 300);
          },
        },
      ],
    },
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
              navigate(`/master/imagegallery`);
            }, 300);
          },
        },
        {
          title: "Your Estimations",
          isActive: window.location.href.toLowerCase().includes("estimation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/estimation`);
            }, 300);
          },
        },
      ],
    },
  ];

  const MenuItemsDealer = [
    {
      title: "Company Profile",
      icon: <BusinessIcon />,
      expanded: true,
      items: [
        {
          title: "Basic Details",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "basicdetails"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/dealer/basicdetails`);
            }, 300);
          },
        },
        {
          title: "My Services",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "myservices"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/dealer/myservices`);
            }, 300);
          },
        },
        {
          title: "Presentation",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "presentation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/dealer/presentation`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Brand & Product",
      icon: <Inventory2Icon />,
      expanded: true,
      items: [
        {
          title: "Brand Master",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "brandmaster"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/dealer/brandmaster`);
            }, 300);
          },
        },
        {
          title: "Brand Setup",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "brandsetup"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/dealer/brandsetup`);
            }, 300);
          },
        },
        {
          title: "Buyer Category",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "buyercategory"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/dealer/buyercategory`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Product",
      icon: <HailIcon />,
      expanded: true,
      items: [
        {
          title: "Product",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "productlisting"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/dealer/productlisting`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Employee",
      icon: <HailIcon />,
      expanded: true,
      items: [
        {
          title: "Employee New / List",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "employee"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/employee`);
            }, 300);
          },
        },
        {
          title: "Employee Report",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "employeereport"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/employeereport`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Organization",
      icon: <CorporateFareIcon />,
      expanded: true,
      items: [
        {
          title: "Add Department",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "adddepartment"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/adddepartment`);
            }, 300);
          },
        },
        {
          title: "Add Branch",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "addbranch"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/addbranch`);
            }, 300);
          },
        },
        {
          title: "Add Designation",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "adddesignation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/adddesignation`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Client",
      icon: <AirlineSeatReclineNormalIcon />,
      expanded: true,
      items: [
        {
          title: "Client List",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "clientlist"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/clientlist`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Purchase",
      icon: <ShopIcon />,
      expanded: true,
      items: [
        {
          title: "Create Purchase Order",
          isActive: GetSearchedText(window.location.href.toLowerCase(), "purchaseorder"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/purchaseorder`);
            }, 300);
          },
        },
      ],
    },
  ];

  const MenuItemsContractor = [
    {
      title: "Company Profile",
      icon: <BusinessIcon />,
      expanded: true,
      items: [
        {
          title: "Basic Details",
          isActive: window.location.href.toLowerCase().includes("basicdetails"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/basicdetails`);
            }, 300);
          },
        },
        {
          title: "My Services",
          isActive: window.location.href.toLowerCase().includes("myservices"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/myservices`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Employee",
      icon: <HailIcon />,
      expanded: true,
      items: [
        {
          title: "Employee New / List",
          isActive: window.location.href.toLowerCase().includes("employee"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/employee`);
            }, 300);
          },
        },
        {
          title: "Employee Report",
          isActive: window.location.href.toLowerCase().includes("employeereport"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/employeereport`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Organization",
      icon: <CorporateFareIcon />,
      expanded: true,
      items: [
        {
          title: "Add Department",
          isActive: window.location.href.toLowerCase().includes("adddepartment"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/adddepartment`);
            }, 300);
          },
        },
        {
          title: "Add Branch",
          isActive: window.location.href.toLowerCase().includes("addbranch"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/addbranch`);
            }, 300);
          },
        },
        {
          title: "Add Designation",
          isActive: window.location.href.toLowerCase().includes("adddesignation"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/adddesignation`);
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
          isActive: window.location.href.toLowerCase().includes("ratecardsetup"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/ratecardsetup`);
            }, 300);
          },
        },
        {
          title: "Send Rate Card",
          isActive: window.location.href.toLowerCase().includes("sendratecard"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/sendratecard`);
            }, 300);
          },
        },
      ],
    },
    {
      title: "Client",
      icon: <AirlineSeatReclineNormalIcon />,
      expanded: true,
      items: [
        {
          title: "Client List",
          isActive: window.location.href.toLowerCase().includes("clientlist"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/clientlist`);
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
          isActive: window.location.href.toLowerCase().includes("appuserenquirywise"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/appuserenquirywise`);
            }, 300);
          },
        },
        {
          title: "Contractor Design Wise",
          isActive: window.location.href.toLowerCase().includes("contractordesignwise"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/contractordesignwise`);
            }, 300);
          },
        },
        {
          title: "Contractor Quotation Wise",
          isActive: window.location.href.toLowerCase().includes("contractorquotationwise"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/contractorquotationwise`);
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
              navigate(`/master/yetstart`);
            }, 300);
          },
        },
        {
          title: "On Going",
          isActive: window.location.href.toLowerCase().includes("ongoing"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/ongoing`);
            }, 300);
          },
        },
        {
          title: "Completed",
          isActive: window.location.href.toLowerCase().includes("completed"),
          navigation: () => {
            open[1](false);
            setTimeout(() => {
              navigate(`/master/completed`);
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
      MenuArr = [...MenuItemsContractor];
      break;
    case 4:
      MenuArr = [...MenuItemsDealer];
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
          expanded={expanded === "panel" + index.toString()}
          onChange={handleChange("panel" + index.toString())}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={item.title} id={item.title} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: "center" }}>{item.icon}</ListItemIcon>
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
                        backgroundColor: listItem.isActive ? theme.palette.primary.main + " !important" : "#ededed",
                      }}
                      onClick={listItem.navigation}
                    >
                      <ListItemText
                        primary={listItem.title}
                        sx={{
                          opacity: 1,
                          color: listItem.isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
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
