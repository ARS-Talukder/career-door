import React from 'react';
import { Link } from 'react-router-dom';
import '../style/style.css';
const Sidebar = () => {
    return (
        <div className='col-span-2 h-screen sticky top-0 sidebar_container'>
            <ul className='flex flex-col gap-2 w-full h-full  px-2 py-4'>
                <li>
                    <Link to='/dashboard' className='hover:bg-success bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'>
                        Add Job
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;