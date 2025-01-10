import classes from "./NotificationBar.module.css"

export default function NotificationBar(props) {
    let specialClasses = "";
    if(props.status ==="error") {
        specialClasses = classes.error;
    }
    if(props.status === "success"){
        specialClasses = classes.success;
    }

    const cssClass = `${classes.notification} ${specialClasses}`;

    return(
        <section className={cssClass}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
}
