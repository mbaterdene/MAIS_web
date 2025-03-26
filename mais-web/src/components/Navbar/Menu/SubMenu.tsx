import React from "react";

interface SubMenuProps {
  hoveredItem: string | null;
  subMenus: Record<string, string[]>;
}

const SubMenu: React.FC<SubMenuProps> = ({ hoveredItem, subMenus }) => {
  if (!hoveredItem) return null;

  return (
    <div className="w-full md:w-1/4 bg-gray-900 p-4 md:p-6 md:absolute md:top-0 md:right-0 md:h-full overflow-y-auto">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">{hoveredItem}</h2>
      <ul className="grid grid-cols-1 gap-2 md:gap-3">
        {subMenus[hoveredItem]?.map((subItem, index) => (
          <li 
            key={index} 
            className="p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer text-sm md:text-base"
          >
            {subItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SubMenu };
