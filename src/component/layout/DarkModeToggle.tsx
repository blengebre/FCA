// DarkModeToggle.tsx
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { toggleDarkMode } from "../../slices/uiSlice";

export default function DarkModeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.ui.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
