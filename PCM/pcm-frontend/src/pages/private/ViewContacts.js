import React, { useState, useEffect } from 'react'

import { Header, ButtonNormal, SearchBar, DisplayTable, Pagination } from '../../components/index';
// import { ModalConfirmation } from '../../components/index';
import HeaderImg from '../../img/pcm_view_contacts.png';

import { Container, Row, Col } from 'react-bootstrap';




import UseAnimations from "react-useanimations";
import trash from 'react-useanimations/lib/trash';


import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { viewContact, logoutUser, viewContacts, deleteSelectedContacts, setMinMaxPageNumberLimit } from '../../services/index';

const ViewContacts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const contacts = useSelector(state => state.viewContacts.contacts);
    const totalContacts = useSelector(state => state.viewContacts.totalContacts);
    const currentPage = useSelector(state => state.viewContacts.page);
    const totalPages = useSelector(state => state.viewContacts.totalPages);
    const deleteContactDone = useSelector(state => state.deleteContact.success);
    const allDeleted = useSelector(state => state.deleteContact.allDeleted);

    const itemPerPage = useSelector(state => state.pagination.itemPerPage);
    const pageNumberLimit = useSelector(state => state.pagination.pageNumberLimit);
    const minPageNumberLimit = useSelector(state => state.pagination.minPageNumberLimit);

//     const [users, setUsers] = useState(Users);
//     const [searchResult, setSearchResult] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
    // const [itemPerPage] = useState(10);
    // const [pageNumberLimit] = useState(3);
    // const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    // const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [deleteIds, setDeleteIds] = useState([]);

    const indexOfLastItem = currentPage+1 * itemPerPage;  //  Calculate the index of the last item in the current page.
    const indexOfFirstItem = indexOfLastItem - itemPerPage; //  Calculate the index of the first item in the current page.
    // const filteredUsers = users.filter((user) => searchResultUser(user));  //  Filter the users based on the search text entered by the user.
    // const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (auth.isLoggedIn) {
            if(deleteContactDone && allDeleted === contacts.length) {
                dispatch(viewContacts(currentPage - 1));
                if((currentPage - 1) % pageNumberLimit === 0) {
                    dispatch(setMinMaxPageNumberLimit(minPageNumberLimit - pageNumberLimit, minPageNumberLimit));
                }
                else {
                    dispatch(setMinMaxPageNumberLimit(0, 3));
                }
            } 
            else if(deleteContactDone && allDeleted !== contacts.length) {
                dispatch(viewContacts(currentPage));
            } else {
                dispatch(viewContacts(currentPage));
            }
            setDeleteIds([]);
        } else {
            dispatch(logoutUser('/login'));
        }
    }, [auth, dispatch, currentPage, deleteContactDone, allDeleted, contacts.length]);

    // useEffect(() => {
    //     if(deleteContact && allDeleted !== contacts.length) {
    //         dispatch(viewContacts(currentPage));
    //     }
    // }, [deleteContact, dispatch, currentPage, allDeleted, contacts.length]);

    // useEffect(() => {
    //     if(allDeleted === contacts.length) {
    //         dispatch(viewContacts(currentPage-1));
    //     }
    // }, [allDeleted, dispatch, currentPage, contacts.length]);

    const handleDeleteSelected = e => {
        e.preventDefault();
        if(deleteIds.length > 0) {
            dispatch(deleteSelectedContacts(deleteIds));
        }
        else {
            toast.info("Please select contacts to be deleted.")
        }
    };
    console.log('deleteId -> ', deleteIds);
    
    return (
        <Container fluid className='view-contact px-sm-2 px-0'>
            <Header image={HeaderImg} text={'View Contacts'} />
            <Row className='mx-auto'>
                <Col className='mx-auto col-xl-10 col-12 px-sm-2 px-0'>
                    <div className='action_button mt-2 d-flex flex-sm-row flex-column-reverse justify-content-between align-items-sm-center align-items-start'>
                        {/* <ButtonNormal name='DeleteBtn' id='DeleteBtn' cName='danger mb-sm-0 mb-4' value="Delete Selected" action={handleDeleteSelected} /> */}
                        <UseAnimations animation={trash} size={25} speed={.5} className="ico" onClick={(e) => handleDeleteSelected(e)}
                            render={(eventProps, animationProps) => (
                                <button type="button" title="Delete Contact" className="btn danger mb-sm-0 mb-4" name='DeleteBtn' id='DeleteBtn' {...eventProps}>
                                    <div {...animationProps} />
                                    <span>Delete Selected</span>
                                </button>
                            )}
                        />
                        <SearchBar cName='display-table-search' />
                    </div>
                    <DisplayTable deleteIds={deleteIds} setDeleteIds={setDeleteIds} indexOfFirstItem={indexOfFirstItem} indexOfLastItem={indexOfLastItem} />
                    <div className={`text-center ${contacts.length !== 0 ? 'd-flex justify-content-center' : 'd-none'}`}>
                        <Pagination />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

const Users = [{
    "id": 1,
    "image": "https://robohash.org/maximesaepeet.png?size=50x50&set=set1",
    "name": "Dottie Causton",
    "email": "dcauston0@china.com.cn",
    "mobileNo": "781-05-8430"
}, {
    "id": 2,
    "image": "https://robohash.org/aspernatureosnostrum.png?size=50x50&set=set1",
    "name": "Amalee Lambot",
    "email": "alambot1@ask.com",
    "mobileNo": "357-88-3187"
}, {
    "id": 3,
    "image": "https://robohash.org/quiaipsamofficiis.png?size=50x50&set=set1",
    "name": "Dianne Follett",
    "email": "dfollett2@google.nl",
    "mobileNo": "383-32-4047"
}, {
    "id": 4,
    "image": "https://robohash.org/sapientecorporisvero.png?size=50x50&set=set1",
    "name": "Lucretia Gisby",
    "email": "lgisby3@drupal.org",
    "mobileNo": "790-63-9358"
}, {
    "id": 5,
    "image": "https://robohash.org/eligendihicsit.png?size=50x50&set=set1",
    "name": "Devlin Tatham",
    "email": "dtatham4@google.com.hk",
    "mobileNo": "557-94-9372"
}, {
    "id": 6,
    "image": "https://robohash.org/quiaundeatque.png?size=50x50&set=set1",
    "name": "Zachary Haycock",
    "email": "zhaycock5@pinterest.com",
    "mobileNo": "459-20-6164"
}, {
    "id": 7,
    "image": "https://robohash.org/ullamestet.png?size=50x50&set=set1",
    "name": "Daffy Carman",
    "email": "dcarman6@sfgate.com",
    "mobileNo": "398-34-3312"
}, {
    "id": 8,
    "image": "https://robohash.org/eligendiutdeleniti.png?size=50x50&set=set1",
    "name": "Chloe Beazleigh",
    "email": "cbeazleigh7@huffingtonpost.com",
    "mobileNo": "406-89-4724"
}, {
    "id": 9,
    "image": "https://robohash.org/eligendiutfuga.png?size=50x50&set=set1",
    "name": "Pavla Egerton",
    "email": "pegerton8@wikispaces.com",
    "mobileNo": "422-96-6554"
}, {
    "id": 10,
    "image": "https://robohash.org/quoquamquia.png?size=50x50&set=set1",
    "name": "Dion Iannelli",
    "email": "diannelli9@pinterest.com",
    "mobileNo": "623-31-4944"
}, {
    "id": 11,
    "image": "https://robohash.org/architectonullafuga.png?size=50x50&set=set1",
    "name": "Gabby MacGaffey",
    "email": "gmacgaffeya@craigslist.org",
    "mobileNo": "565-10-8822"
}, {
    "id": 12,
    "image": "https://robohash.org/impeditrecusandaehic.png?size=50x50&set=set1",
    "name": "Leisha Bartholat",
    "email": "lbartholatb@redcross.org",
    "mobileNo": "758-39-7345"
}, {
    "id": 13,
    "image": "https://robohash.org/nihilconsequaturvoluptatum.png?size=50x50&set=set1",
    "name": "Mellie Rothery",
    "email": "mrotheryc@ft.com",
    "mobileNo": "422-35-2160"
}, {
    "id": 14,
    "image": "https://robohash.org/istepossimuserror.png?size=50x50&set=set1",
    "name": "Dottie Edgecumbe",
    "email": "dedgecumbed@irs.gov",
    "mobileNo": "843-16-0322"
}, {
    "id": 15,
    "image": "https://robohash.org/veliureodit.png?size=50x50&set=set1",
    "name": "Archibald Hulburd",
    "email": "ahulburde@typepad.com",
    "mobileNo": "739-13-1976"
}, {
    "id": 16,
    "image": "https://robohash.org/auttemporibusaut.png?size=50x50&set=set1",
    "name": "Prudy Mottram",
    "email": "pmottramf@businessinsider.com",
    "mobileNo": "460-27-5715"
}, {
    "id": 17,
    "image": "https://robohash.org/reprehenderitrecusandaeexcepturi.png?size=50x50&set=set1",
    "name": "Ashlen Sawell",
    "email": "asawellg@i2i.jp",
    "mobileNo": "579-36-2562"
}, {
    "id": 18,
    "image": "https://robohash.org/culpasaepedeleniti.png?size=50x50&set=set1",
    "name": "Paige Hirschmann",
    "email": "phirschmannh@csmonitor.com",
    "mobileNo": "715-73-0025"
}, {
    "id": 19,
    "image": "https://robohash.org/quasinanimi.png?size=50x50&set=set1",
    "name": "Darrel Isabell",
    "email": "disabelli@artisteer.com",
    "mobileNo": "176-84-8453"
}, {
    "id": 20,
    "image": "https://robohash.org/nonexplicabovero.png?size=50x50&set=set1",
    "name": "Monte Hadye",
    "email": "mhadyej@storify.com",
    "mobileNo": "874-65-4092"
}, {
    "id": 21,
    "image": "https://robohash.org/atautiure.png?size=50x50&set=set1",
    "name": "Sansone Meegan",
    "email": "smeegank@linkedin.com",
    "mobileNo": "499-85-8036"
}, {
    "id": 22,
    "image": "https://robohash.org/asperioresesseminima.png?size=50x50&set=set1",
    "name": "Fredi Iffe",
    "email": "fiffel@google.cn",
    "mobileNo": "842-39-5599"
}, {
    "id": 23,
    "image": "https://robohash.org/modisimiliquedoloremque.png?size=50x50&set=set1",
    "name": "Germayne Whitney",
    "email": "gwhitneym@weather.com",
    "mobileNo": "513-11-4061"
}, {
    "id": 24,
    "image": "https://robohash.org/vitaesedaut.png?size=50x50&set=set1",
    "name": "Kariotta Spillett",
    "email": "kspillettn@ftc.gov",
    "mobileNo": "785-45-3379"
}, {
    "id": 25,
    "image": "https://robohash.org/rerumsedvoluptas.png?size=50x50&set=set1",
    "name": "Avrit Kobierski",
    "email": "akobierskio@spotify.com",
    "mobileNo": "264-49-1632"
}, {
    "id": 26,
    "image": "https://robohash.org/pariaturrepellendusesse.png?size=50x50&set=set1",
    "name": "Lynda Hawksley",
    "email": "lhawksleyp@psu.edu",
    "mobileNo": "145-14-4255"
}, {
    "id": 27,
    "image": "https://robohash.org/rerumdoloremqueest.png?size=50x50&set=set1",
    "name": "Frances Medforth",
    "email": "fmedforthq@springer.com",
    "mobileNo": "854-59-5334"
}, {
    "id": 28,
    "image": "https://robohash.org/saepeidillo.png?size=50x50&set=set1",
    "name": "Gabbie Palfrie",
    "email": "gpalfrier@trellian.com",
    "mobileNo": "260-58-9605"
}, {
    "id": 29,
    "image": "https://robohash.org/natuslaudantiumvel.png?size=50x50&set=set1",
    "name": "Eimile Skillings",
    "email": "eskillingss@tumblr.com",
    "mobileNo": "767-07-7163"
}, {
    "id": 30,
    "image": "https://robohash.org/eiusidnon.png?size=50x50&set=set1",
    "name": "Issie Lemar",
    "email": "ilemart@moonfruit.com",
    "mobileNo": "109-62-1112"
}, {
    "id": 31,
    "image": "https://robohash.org/enimvoluptatemdignissimos.png?size=50x50&set=set1",
    "name": "Gunter Mantione",
    "email": "gmantioneu@icq.com",
    "mobileNo": "871-78-3813"
}, {
    "id": 32,
    "image": "https://robohash.org/evenietquammolestias.png?size=50x50&set=set1",
    "name": "Rosemaria Baselio",
    "email": "rbaseliov@prweb.com",
    "mobileNo": "677-26-6159"
}, {
    "id": 33,
    "image": "https://robohash.org/quisvoluptatemesse.png?size=50x50&set=set1",
    "name": "Nathan Harcus",
    "email": "nharcusw@feedburner.com",
    "mobileNo": "529-48-5483"
}, {
    "id": 34,
    "image": "https://robohash.org/asperioresenimdebitis.png?size=50x50&set=set1",
    "name": "Zenia Baynom",
    "email": "zbaynomx@rambler.ru",
    "mobileNo": "784-56-9707"
}, {
    "id": 35,
    "image": "https://robohash.org/laudantiumvoluptatemquo.png?size=50x50&set=set1",
    "name": "Mozelle Andrea",
    "email": "mandreay@addtoany.com",
    "mobileNo": "385-58-3957"
}, {
    "id": 36,
    "image": "https://robohash.org/quiautemvoluptatum.png?size=50x50&set=set1",
    "name": "Loreen Halladay",
    "email": "lhalladayz@sfgate.com",
    "mobileNo": "679-34-0525"
}, {
    "id": 37,
    "image": "https://robohash.org/eumetqui.png?size=50x50&set=set1",
    "name": "Glad Ivanitsa",
    "email": "givanitsa10@nyu.edu",
    "mobileNo": "765-87-2612"
}, {
    "id": 38,
    "image": "https://robohash.org/aliquamautet.png?size=50x50&set=set1",
    "name": "Tuck Lescop",
    "email": "tlescop11@tumblr.com",
    "mobileNo": "843-26-5170"
}, {
    "id": 39,
    "image": "https://robohash.org/utistequis.png?size=50x50&set=set1",
    "name": "Elnora Lundbeck",
    "email": "elundbeck12@furl.net",
    "mobileNo": "479-88-5598"
}, {
    "id": 40,
    "image": "https://robohash.org/distinctiovoluptasvoluptas.png?size=50x50&set=set1",
    "name": "Elton Karolyi",
    "email": "ekarolyi13@pagesperso-orange.fr",
    "mobileNo": "209-60-4325"
}, {
    "id": 41,
    "image": "https://robohash.org/eamagnidebitis.png?size=50x50&set=set1",
    "name": "Fonsie Duckering",
    "email": "fduckering14@liveinternet.ru",
    "mobileNo": "656-75-5800"
}, {
    "id": 42,
    "image": "https://robohash.org/utautemdolor.png?size=50x50&set=set1",
    "name": "Grantham Scarlet",
    "email": "gscarlet15@icq.com",
    "mobileNo": "226-98-7138"
}, {
    "id": 43,
    "image": "https://robohash.org/vitaenamrepellat.png?size=50x50&set=set1",
    "name": "Madonna Churms",
    "email": "mchurms16@shareasale.com",
    "mobileNo": "552-07-9770"
}, {
    "id": 44,
    "image": "https://robohash.org/nullavoluptatemsit.png?size=50x50&set=set1",
    "name": "Lorri Haysey",
    "email": "lhaysey17@issuu.com",
    "mobileNo": "134-66-2119"
}, {
    "id": 45,
    "image": "https://robohash.org/dignissimosinexcepturi.png?size=50x50&set=set1",
    "name": "Blithe Lemmanbie",
    "email": "blemmanbie18@meetup.com",
    "mobileNo": "895-25-6214"
}, {
    "id": 46,
    "image": "https://robohash.org/quiquiest.png?size=50x50&set=set1",
    "name": "Ellerey Keigher",
    "email": "ekeigher19@taobao.com",
    "mobileNo": "248-32-4684"
}, {
    "id": 47,
    "image": "https://robohash.org/accusantiumetaut.png?size=50x50&set=set1",
    "name": "Ellary Pariso",
    "email": "epariso1a@sphinn.com",
    "mobileNo": "175-89-2120"
}, {
    "id": 48,
    "image": "https://robohash.org/nonvoluptateipsum.png?size=50x50&set=set1",
    "name": "Corrine Alcoran",
    "email": "calcoran1b@senate.gov",
    "mobileNo": "604-43-5183"
}, {
    "id": 49,
    "image": "https://robohash.org/eligendiconsecteturquisquam.png?size=50x50&set=set1",
    "name": "Kathy Benesevich",
    "email": "kbenesevich1c@qq.com",
    "mobileNo": "288-95-5216"
}, {
    "id": 50,
    "image": "https://robohash.org/voluptatemestofficiis.png?size=50x50&set=set1",
    "name": "Maryellen Cleghorn",
    "email": "mcleghorn1d@creativecommons.org",
    "mobileNo": "853-92-8407"
}, {
    "id": 51,
    "image": "https://robohash.org/officiareiciendismaiores.png?size=50x50&set=set1",
    "name": "Tate Boldecke",
    "email": "tboldecke1e@biglobe.ne.jp",
    "mobileNo": "192-86-9986"
}, {
    "id": 52,
    "image": "https://robohash.org/excepturiquoeius.png?size=50x50&set=set1",
    "name": "Dallas Caris",
    "email": "dcaris1f@oakley.com",
    "mobileNo": "451-88-4215"
}, {
    "id": 53,
    "image": "https://robohash.org/eumcorporiset.png?size=50x50&set=set1",
    "name": "Clim McMains",
    "email": "cmcmains1g@mtv.com",
    "mobileNo": "839-09-4080"
}, {
    "id": 54,
    "image": "https://robohash.org/laudantiumculpaquis.png?size=50x50&set=set1",
    "name": "Noelle Charteris",
    "email": "ncharteris1h@ucla.edu",
    "mobileNo": "160-99-8464"
}]

// const ViewContacts = () => {
//     const [users, setUsers] = useState(Users);
//     const [searchResult, setSearchResult] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemPerPage] = useState(10);
//     const [pageNumberLimit] = useState(3);
//     const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
//     const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);

//     const handleDeleteSelected = e => {
//         e.preventDefault();
//         let newUsers = [...users];
//         newUsers = newUsers.filter(user => {
//             return !user.isChecked;
//         });
//         setUsers(newUsers);
//     };

//     const searchResultUser = user => {
//         if (searchResult === '') {
//             return user;
//         } else if (user.name.toLowerCase().includes(searchResult.toLowerCase()) || user.email.toLowerCase().includes(searchResult.toLowerCase()) || user.mobileNo.toLowerCase().includes(searchResult.toLowerCase())) {
//             return user;
//         }
//         return null;
//     };

//     const indexOfLastItem = currentPage * itemPerPage;  //  Calculate the index of the last item in the current page.
//     const indexOfFirstItem = indexOfLastItem - itemPerPage; //  Calculate the index of the first item in the current page.
//     const filteredUsers = users.filter((user) => searchResultUser(user));  //  Filter the users based on the search text entered by the user.
//     const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);  //  Get the users in the current page.

//     return (
//         <Container fluid className='view-contact px-sm-2 px-0'>
//             <Header image={HeaderImg} text={'View Contacts'} />
//             <Row className='mx-auto'>
//                 <Col className='mx-auto col-xl-10 col-12 px-sm-2 px-0'>
//                     <div className='action_button mt-2 d-flex flex-sm-row flex-column-reverse justify-content-between align-items-sm-center align-items-start'>
//                         <ButtonNormal name='DeleteBtn' id='DeleteBtn' cName='btn form_reset red me-0 mb-sm-0 mb-4' value="Delete Selected" action={handleDeleteSelected} />
//                         <SearchBar cName='display-table-search' searchResult={searchResult} setSearchResult={setSearchResult} />
//                     </div>
//                     <DisplayTable users={users} filteredUsers={filteredUsers} currentItems={currentItems} setUsers={setUsers} indexOfFirstItem={indexOfFirstItem} indexOfLastItem={indexOfLastItem} />
//                     <div className={`text-center ${filteredUsers.length !== 0 ? 'd-flex justify-content-center' : 'd-none'}`}>
//                         <Pagination
//                             filteredUsers={filteredUsers}
//                             itemPerPage={itemPerPage}
//                             currentPage={currentPage}
//                             setCurrentPage={setCurrentPage}
//                             pageNumberLimit={pageNumberLimit}
//                             minPageNumberLimit={minPageNumberLimit}
//                             setMinPageNumberLimit={setMinPageNumberLimit}
//                             maxPageNumberLimit={maxPageNumberLimit}
//                             setMaxPageNumberLimit={setMaxPageNumberLimit}
//                         />
//                     </div>
//                 </Col>
//             </Row>
            
//         </Container>
//     )
// }

export default ViewContacts