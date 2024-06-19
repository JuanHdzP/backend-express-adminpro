const getMenuSidebar = (role = USER_ROLE)=>{
    const menu = [
        {
          title: "Dashboard",
          icon: "mdi mdi-gauge",
          submenu: [
            { title: "Main", path: "" },
            { title: "ProgressBar", path: "progress" },
            { title: "Grafica", path: "grafica1" },
            { title: "Promesas", path: "promesas" },
            { title: "Rxjs", path: "rxjs" },
          ],
        },
        {
          title: "Mantenimiento",
          icon: "mdi mdi-folder-lock-open",
          submenu: [
            //{ title: "Usuarios", path: "usuarios" },
            { title: "Hospitales", path: "hospitales" },
            { title: "Médicos", path: "medicos" },
          ],
        },
      ];   
      
      if(role == "ADMIN_ROLE"){
        menu[1].submenu.unshift({ title: "Usuarios", path: "usuarios" });
      }

      return menu;
}

module.exports= {
    getMenuSidebar,
}