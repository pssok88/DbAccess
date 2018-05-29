import * as React from "react";
import { IGridViewOptions } from "../../interfaces";
import { IconButton } from "../../common/components/form/iconbutton";
import { Button } from "../../common/components/form/button";
import * as Moment from "moment";
import { IAthleteUnverified } from "../../interfaces/manageUsers/IAthleteUnverified";
import { hashHistory } from "react-router";

export const AthleteUnverifiedList: React.StatelessComponent<IGridViewOptions<IAthleteUnverified>> = (props: IGridViewOptions<IAthleteUnverified>) => {
    return (
        <React.Fragment>
            <div className="an-single-component with-shadow">
                <div className="an-component-header">
                    <h3 style={{ textAlign: "center" }}><strong>Unverified Athletes</strong></h3>
                </div>
                <div className="an-component-body padding20">
                    <div className="an-user-lists tables messages">
                        <div className="list-title">
                            <table className="an-lists-body an-customScrollbar ps-container ps-theme-default">
                                <thead>
                                    <tr>
                                        {props.headerColumns != null ? (
                                            props.headerColumns.map((itm, i) => {
                                                return <th key={i} style={{ fontSize: "15px" }} className={itm.columnStyle}><strong>{itm.columnName}</strong></th>
                                            })
                                        )
                                            : ("")
                                        }
                                    </tr>
                                </thead>
                                {/*props.dataItems.length != 0 ? (props.dataItems.map(buildRow(props))) : ""*/}
                                {props.dataItems.map(buildRow(props))}
                            </table>
                        </div>
                    </div>
                </div>
                {props.dataItems.length == 0 ? <h3 style={{ textAlign: "center" }}><strong>Sorry user does not exist</strong></h3> : ""}
            </div>
        </React.Fragment>
    )
}

const buildRow = (props: IGridViewOptions<IAthleteUnverified>) => (itm: IAthleteUnverified, ndx: number) => {
    let verified;
    return (
        <tbody key={ndx}>
            <tr>
                <td className="basis-20"> {/*terenary operator created to toggle between verify and unverify icon*/}
                    <a href="javascript:;" onClick={isValidated(props, itm.userBaseId, itm.isValidated, itm.isProfessional)}><i className={itm.isValidated == false ? verified = "ion-close-round lockedColor" : verified = "ion-checkmark-circled"} style={{ fontSize: "15px", marginLeft: "20px" }} /></a>
                </td>
                <td className="basis-20"> {/*terenary operator created to toggle between a verify and unverify icon*/}
                    <a href="javascript:;" onClick={isProfessional(props, itm.userBaseId, itm.isValidated, itm.isProfessional)}><i className={itm.isProfessional == false ? verified = "ion-close-round lockedColor" : verified = "ion-checkmark-circled"} style={{ fontSize: "15px", marginLeft: "5px" }} /></a>
                </td>
                <td className="basis-20" style={{ fontSize: "15px" }}>{itm.firstName}</td>
                <td className="basis-20" style={{ fontSize: "15px" }}>{itm.lastName}</td>
                <td className="basis-20">
                    <a href="javascript:;" onClick={() => hashHistory.push('/publicprofile/' + itm.userBaseId)}><i className="ion-forward" style={{ paddingLeft: "15px" }} /></a>{/*add link to public athlete page*/}
                </td>
            </tr>
        </tbody>);
}



const isValidated = (props: IGridViewOptions<IAthleteUnverified>, userBaseId: number, verify: boolean, pro: boolean) => (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    props.verified(userBaseId, verify, pro);
}
const isProfessional = (props: IGridViewOptions<IAthleteUnverified>, userBaseId: number, verify: boolean, pro: boolean) => (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    props.professional(userBaseId, verify, pro);
}