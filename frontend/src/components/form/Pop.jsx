import React, { useState } from "react";
import { usePocket } from "../../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Pop(props) {
    const { criador, pb } = usePocket();
    const title = (props.modalInfo.event.title);
    const creator = (props.modalInfo.event.extendedProps.creator);
    let [data, setData] = useState([]);

    useQuery({
        queryKey: [creator],
        queryFn: async () => {
          return(await pb.collection('users').getOne(creator, {
            })
          );
        }
      });

    const queryClient = useQueryClient()
    data = queryClient.getQueryData({ queryKey: [creator] });

    return(     
        <div className="pop__wrapper">
            <Form.Root>
                <Form.Field className="" name="title">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white ">Evento: {title}</Form.Label>
                </Form.Field>
                <Form.Field className="" name="creator">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white " >Criador: {data && data.username ? data.username : "..."}</Form.Label>
                </Form.Field>
            </Form.Root>   
        </div>
    );
};