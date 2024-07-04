import React from 'react';
import "./Navbar.css";
import { RiMenu2Fill } from "react-icons/ri";
import Button from '../Button/Button';
import { LuFactory } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { FaBuildingColumns } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { colorInfo, setExpandedMenu, setIsSubmenuVisible } from '../../store/slice';
import { IoMdMoon } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Navbar() {
    const color = useSelector((state) => state.user.color);
    const expandedMenu = useSelector((state) => state.user.expandedMenu);
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const dispatch = useDispatch();

    const toggleColor = () => {
        dispatch(colorInfo(!color));
    };

    const toggleMenu = (index) => {
        if (expandedMenu === index && isSubmenuVisible) {
            dispatch(setIsSubmenuVisible(false));
        } else {
            dispatch(setExpandedMenu(index));
            dispatch(setIsSubmenuVisible(true));
        }
    };

    return (
        <div className='main-navbar'>
            <div className='navbar-title-icon'>
                {isSubmenuVisible ?
                    <IoIosArrowBack
                        style={{ color: 'var(--main-green-color)' }}
                        size={25}
                        onClick={() => toggleMenu(expandedMenu)}
                    />
                    :
                    <RiMenu2Fill
                        style={{ color: 'var(--main-green-color)' }}
                        size={25}
                        onClick={() => toggleMenu(expandedMenu)}
                    />
                }
                <p style={{ color: "var(--main-text-color)" }} >Account List</p>
            </div>

            <div className='btn-nav'>
                <div className='fact-info'>
                    <Button text='Saztec EPZ' logo={<LuFactory size={25} />} />
                    <Button text='Export Processing Zone, Karachi Plot # 4 & 5, Sector C-V, Phase I' logo={<IoLocationSharp size={50} />} />
                    <Button text='Saztex Main' logo={<FaBuildingColumns size={25} />} />
                </div>
                {color ? <IoMdMoon size={25} onClick={toggleColor} className='sun-svg' /> :
                    <MdLightMode size={25} onClick={toggleColor} className='sun-svg' />
                }
            </div>
        </div>
    );
}
