export default {
    data () {
        return {
            messages : []
        }
    },
    methods: {
        add_message(message, repeat = true) {
            var new_message = true
            if (!repeat)
            {
                for (let i=0; i<this.messages.length; i ++)
                {
                    if (this.messages[i].message == message)
                    {
                        new_message = false
                        break
                    }
                }
            }
            if ((!repeat & new_message) | repeat)
            {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                this.messages.push(
                {
                    time:time,
                    message: message
                }
                )
            }
            
        },
        remove_message(message_id) {
            var new_messages = new Array()
            for (let i=0; i<this.messages.length;i++)
            {
                if (this.messages[i].time != message_id)
                {
                new_messages.push(this.messages[i])
                }
            }
            this.messages = new_messages
        }
    }
}