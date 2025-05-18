import {
  Button,
  ButtonProps,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuTrigger,
  MenuTriggerProps,
  Popover,
  PopoverProps,
  Separator,
} from "react-aria-components";
import styles from "./Dropdown.module.css";

export function DropdownButton(props: ButtonProps) {
  return <Button {...props} className={styles.button} />;
}

export function DropdownMenu(props: PopoverProps) {
  const { children, ...popoverProps } = props;
  return (
    <Popover {...popoverProps} className={styles.popover}>
      <Menu className={styles.menu}>{children}</Menu>
    </Popover>
  );
}

export function DropdownItem(props: MenuItemProps) {
  return <MenuItem {...props} className={styles.menuItem} />;
}

export function DropdownSeparator() {
  return <Separator className={styles.separator} />;
}

/**
 * @example
 * <Dropdown>
 *   <DropdownButton>Open</DropdownButton>
 *   <DropdownMenu>
 *     <DropdownItem>Item 1</DropdownItem>
 *     <DropdownItem>Item 2</DropdownItem>
 *   </DropdownMenu>
 * </Dropdown>
 */
export function Dropdown(props: MenuTriggerProps) {
  return <MenuTrigger {...props} />;
}
