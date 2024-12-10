import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaUserGraduate, FaWpforms , FaComments,FaChalkboardTeacher ,FaNetworkWired, FaUserAstronaut  } from 'react-icons/fa';

const Sidebar= () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
 

  const handleMenuClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuData = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <FaTachometerAlt />,
      submenu: []
    },
    {
      title: "Course Details",
      link: "#",
      icon: <FaBook />,
      submenu: [
        { title: "Add Course", link: "/addcourse" },
        { title: "View Course", link: "/viewcourse" },
        { title: "Add Batches", link: "/addbatches" },
        { title: "View Batches", link: "/viewbatches" }
        
      
      ]
    },
    {
      title: "Student",
      link: "#",
      icon: <FaUserGraduate />,
      submenu: [
        { title: "Add Student", link: "/addstudent" },
        { title: "View Student", link: "/viewstudent" },
        { title: "Add Students To Batch", link: "/addstudenttobatch" }
      ]
    },
    {
      title: "Instructor",
      link: "#",
      icon: <FaChalkboardTeacher />,
      submenu: [ 
        { title: "Add Instructor", link: "/addinstructor" },
        { title: "View Instructor", link: "/viewinstructor" },
        { title: "Add Instructor To Batch", link: "/addinstructortobatch" }
      ]
    },
    {
      title: "Workshop",
      link: "#",
      icon: <FaNetworkWired />,
      submenu: [
        { title: "Add Workshop", link: "/addworkshop" },
        { title: "View Workshop", link: "/viewworkshop" }
        
      ]
    },
    {
      title: "Enrollment From Website",
      link: "/enrollmentsfromstatic",
      icon: <FaWpforms />,
      submenu: []
    },
    {
      title: "Enquiry",
      link: "/dashboard/enquiry",
      icon: <FaComments />,
      submenu: []
    },
    {
      title: "Add Admin",
      link: "/dashboard/addadmin",
      icon: <FaUserAstronaut />,
      submenu: []
    }

  ];

  return (
    <div className="flex">
      <div
        className={`bg-gray-800 text-white h-screen p-5 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <button
          className="focus:outline-none text-white"
          onClick={toggleSidebar}
        >
          {isOpen ? '<<' : '>>'}
        </button>
        <ul className="mt-5">
          {menuData.map((item, index) => (
            <li key={index} className="mb-4">
              <button
                className="flex items-center w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
                onClick={() => handleMenuClick(index)}
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className={`ml-3 flex-1 text-left transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <Link component={Link}
                        to={item.link}
                        className="text-sm hover:underline"
                      >
                        {item.title}
                      </Link>
                  
                </span>
              </button>
              {item.submenu.length > 0 && activeIndex === index && isOpen && (
                <ul className="pl-8 mt-2">
                  {item.submenu.map((subitem, subindex) => (
                    <li key={subindex} className="mb-2">
                      <Link component={Link}
                        to={subitem.link}
                        className="text-sm hover:underline"
                      >
                        {subitem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div> 
      
    </div>
  );
};

export default Sidebar;
