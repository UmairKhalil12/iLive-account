import React, { useState } from 'react';
import { CiBoxList } from "react-icons/ci";
import { MdPerson } from 'react-icons/md';
import { MdOutlineAccountBalance } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { setExpandedMenu, setIsSubmenuVisible } from '../../../store/slice';
import { PiSquaresFourThin } from "react-icons/pi";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const expandedMenu = useSelector((state) => state.user.expandedMenu);
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const [nestedMenu, setNestedMenu] = useState(null);
    const menuItems = [
        {
            icon: <MdOutlineAccountBalance size={24} />, title: "Accounts", submenu: [
                { icon: <CiBoxList size={17} onClick={() => navigate("/")} />, text: "Account List", onclick: () => navigate("/") },
                { icon: <CiBoxList size={17} onClick={() => navigate("/voucher")} />, text: "Cash Payment", onclick: () => navigate("/voucher") },
                { icon: <CiBoxList size={17} onClick={() => navigate("/CashRecieveVoucher")} />, text: "Cash Receipt", onclick: () => navigate("/CashRecieveVoucher") },
                { icon: <CiBoxList size={17} onClick={() => navigate("/BankPaymentVoucher")} />, text: "Bank Payment", onclick: () => navigate("/BankPaymentVoucher") },
                { icon: <CiBoxList size={17} onClick={() => navigate("/BankRecieveVoucher")} />, onclick: () => navigate('/BankRecieveVoucher'), text: "Bank Receipt" },
                { icon: <CiBoxList size={17} onClick={() => navigate("/JournalVoucher")} />, text: "Journal Voucher", onclick: () => navigate("/JournalVoucher") },
                { icon: <CiBoxList size={17} />, text: "Voucher Junction" },
                { icon: <CiBoxList size={17} />, text: "Exchange Rate Setup" },
                { icon: <CiBoxList size={17} />, text: "Statement" },
                { icon: <CiBoxList size={17} />, text: "Trial Balance" },
                { icon: <CiBoxList size={17} />, text: "Balance Sheet" },
                { icon: <CiBoxList size={17} />, text: "Profit & Loss" },
            ]
        },
        {
            icon: <PiSquaresFourThin size={24} />, title: 'Admin Setup', submenu: [
                {
                    text: 'Menu and Rights',
                    submenu: ['User Rights', 'System Groups', 'Group Wise Menu', 'User Details']
                },
                {
                    text: 'Setups',
                    submenu: ['Custom Setup', 'Generic Setup', 'Location Setup', 'Department Setup', 'Sub-Department']
                }
            ]
        }
    ];

    const toggleMenu = (index) => {
        if (expandedMenu === index && isSubmenuVisible) {
            dispatch(setIsSubmenuVisible(false));
        } else {
            dispatch(setExpandedMenu(index));
            dispatch(setIsSubmenuVisible(true));
        }
    };

    const toggleNestedMenu = (index) => {
        setNestedMenu(nestedMenu === index ? null : index);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
            </div>
            <div className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <div
                            className={`menu-item-main ${expandedMenu === index && isSubmenuVisible ? 'active' : ''}`}
                            onClick={() => toggleMenu(index)}
                        >
                            <span >{item.icon}</span>
                        </div>
                        <div className={`submenu-panel ${expandedMenu === index && isSubmenuVisible ? 'show' : ''}`}>
                            <p className='heading-submenu'>{item.title}</p>
                            {item.submenu.map((subitem, subindex) => (
                                <div key={subindex}>
                                    <div
                                        className={`menu-item submenu-item ${subitem.submenu ? 'has-nested-submenu' : ''}`}
                                        onClick={() => {
                                            if (subitem.submenu) {
                                                toggleNestedMenu(subindex);
                                            }
                                        }}
                                    >
                                        <span onClick={subitem.onclick}>{subitem.icon} </span>
                                        <p style={{ marginLeft: '5px' }} onClick={subitem.onclick}  >{subitem.text}</p>
                                        {subitem.submenu && (
                                            <span className="menu-arrow">
                                                {nestedMenu === subindex ? <FaChevronUp /> : <FaChevronDown />}
                                            </span>
                                        )}
                                    </div>
                                    {subitem.submenu && (
                                        <div className={`nested-submenu ${nestedMenu === subindex ? 'show' : ''}`}>
                                            {subitem.submenu.map((menu, menuIndex) => (
                                                <div className='submenu-menu-text-icon' key={menuIndex}>
                                                    <CiBoxList />
                                                    <p style={{ marginLeft: '25px' }}>{menu}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="sidebar-footer">
                <MdPerson size={24} />
            </div>
        </div>
    );
}
