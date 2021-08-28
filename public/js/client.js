

var socket = io();
    // Create new user
    var btnCreate = document.querySelector('.confirm');
    btnCreate.onclick = function() {
        //
        name = document.querySelector('.inputName').value;

        // 1. Dang nhap
        socket.emit('dangnhap',name);
        socket.on('ds-room', renderListRoom)  
        // Thay doi form
        changedForm('none','block','none');
        // thay doi hello user
        document.querySelector('.name-user').innerText = name;

        // 

        // 2 Su kien click create room 
        var btnCreateRoom = document.querySelector('.create-new-room');
        btnCreateRoom.onclick = function() {
            var Newroom = document.querySelector('.findroom').value;
            socket.emit('create-room', Newroom)
            changedForm('flex','none','none');
            changeRoomName(Newroom);
            socket.on('list-member', renderListMember)
            // 2.1 su kien log out room
            var btnLogout = document.querySelector('.logout');
            btnLogout.onclick = function() {
                socket.emit('user-logout', name);
                $('.name-room').html("");
                $('.list-member').html("");
                changedForm('none','block','none');
                socket.on('re-render-member', renderListMember)
                socket.on('re-render-room', renderListRoom)

            }

            var btnSendchat = document.querySelector('.sendchat');
            btnSendchat.onclick = function() {
                var textMessage = document.querySelector('.inputmsg').value;
                document.querySelector('.inputmsg').value="";
                socket.emit('user-sendchat', textMessage);
                console.log(textMessage);
                var time = new Date();;
                var timesend = time.getHours() + ":" + time.getMinutes();
                $('.text-content').append(`
                <div class="message-row my-massage">
                    <div class="message-title">
                        <span>${name}</span>
                    </div>
                    <div class="message-content">
                       ${textMessage}
                    </div>
                    <div class="message-time">${timesend}</div>
                </div>
                `)
            }
            socket.on('sever-sendchat', (data,name)=> {
                var time = new Date();;
                var timesend = time.getHours() + ":" + time.getMinutes();
                $('.text-content').append(`
                <div class="message-row orther-massage">
                    <div class="message-title">
                        <span>${name}</span>
                    </div>
                    <div class="message-content">
                       ${data}
                    </div>
                    <div class="message-time">${timesend}</div>
                </div>
                `)
            })

            socket.on('disconnect', ()=> {
                // socket.emit('user-logout', name);
                // console.log(name)
                // $('.name-room').html("");
                // $('.list-member').html("");
                // changedForm('none','block','none');
                // socket.on('re-render-member', renderListMember)
                // socket.on('re-render-room', renderListRoom)
                socket.emit('user-out', "co nguoi da thoat");
            })

        }
        socket.on('re-render-member', renderListMember)
        socket.on('re-render-room', renderListRoom)
        }


    // render ra ten phong 
    function changeRoomName(roomName) {
        $('.name-room').html("");
        $('.name-room').append(`<p>${roomName}</p>`)
    }
    // render ra ds thanh vien
    function renderListMember(listMember) {
        $('.list-member').html("");
        for(var i=0; i<listMember.length; i++){
            $('.list-member').append(`<p>${listMember[i]}</p>`)
        }
    }
    // render ra list room
    function renderListRoom(listRoom) {
        $('.list-room').html("");
        for(var i = 0;i<listRoom.length; i++) {
            $('.list-room').append(`<p>${listRoom[i]}</p>`)
        }
    }


    // change form fun
    function changedForm(formchat1,formlogin1,formcreateacc) {

        var formChat = document.querySelector('.message-main');
        var formLogin = document.querySelector('.login-room');
        var inputName = document.querySelector('.inputName');
        var btnCreate = document.querySelector('.confirm');
        formChat.style.display = formchat1;
        formLogin.style.display=formlogin1;
        inputName.style.display = formcreateacc;
        btnCreate.style.display = formcreateacc;
        var textContent = document.querySelector('.message');
        textContent.scrollTo(0,document.querySelector('.text-content').clientHeight)
     }