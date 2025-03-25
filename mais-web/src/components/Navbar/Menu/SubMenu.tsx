import React from "react";

interface SubMenuProps {
  hoveredItem: string | null;
  subMenus: Record<string, string[]>;
}

const SubMenu: React.FC<SubMenuProps> = ({ hoveredItem, subMenus }) => {
  if (!hoveredItem) return null;

  return (
    <div className="w-1/4 bg-gray-900 p-6">
      <h2 className="text-lg font-semibold mb-4">{hoveredItem}</h2>
      <ul className="space-y-2">
        {subMenus[hoveredItem]?.map((subItem, index) => (
          <li key={index} className="p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer">
            {subItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubMenu;
