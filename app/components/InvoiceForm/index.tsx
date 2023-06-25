'use client';
import { useFieldArray, useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInvoiceFormSchema, invoiceSchemaData } from '@/types/schema';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';
import arrowLeft from '@/assets/icon-arrow-left.svg';
import garbage from '@/assets/icon-delete.svg';
import { getInvoice } from '@/redux/features/invoice-slice';
import { useEffect } from 'react';
import {
	useCreateNewInvoiceMutation,
	useGetInvoiceQuery,
} from '@/redux/features/invoice-api-slice';
import Skeleton from '../Skeleton';
import { Input } from '../Input/Input';
import { InputSelect } from '../InputSelect/InputSelect';

export default function InvoiceForm() {
	const dispatch = useAppDispatch();
	const { formType, id } = useAppSelector(state => state.invoiceSelect);

	const [createNewInvoice] = useCreateNewInvoiceMutation({
		fixedCacheKey: 'shared-update-invoices',
	});
	const { handleSubmit, control, reset } = useForm<invoiceSchemaData>({
		resolver: zodResolver(createInvoiceFormSchema),
		defaultValues: {
			items: [
				{
					name: '',
					quantity: 0,
					price: 0,
					total: 0,
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	const { data: single, isFetching } = useGetInvoiceQuery({ id }, { skip: formType === 'new' });

	const onGoBack = () => {
		reset({});
		dispatch(getInvoice({ id, formType: 'new', isShowing: true }));
	};

	useEffect(() => {
		if (formType === 'new') return reset({});
		reset(single);
	}, [reset, single, formType]);

	return (
		<div className="w-full">
			<button
				className="my-6  text-white text-md font-bold flex items-center"
				onClick={() => onGoBack()}
			>
				<Image className="mr-4" src={arrowLeft} alt="plus icon" height={12} />
				Go Back
			</button>

			{!isFetching ? (
				<>
					<h1 className="text-white text-2xl font-bold mb-6">
						{formType === 'edit' ? `Edit #${id}` : 'New Invoice'}
					</h1>
					<form
						onSubmit={handleSubmit(d => {
							createNewInvoice({ payload: d });
						})}
						className="text-light-gray w-full "
					>
						<h1 className="text-light-purple mb-2 text-xl">Bill From</h1>

						<Input
							name="adress.street"
							displayName="Street Address"
							control={control}
						/>

						<div className="flex items-center justify-between w-full gap-4">
							<Input name="adress.city" displayName="City" control={control} />

							<Input
								name="adress.postCode"
								displayName="Post Code"
								control={control}
							/>
						</div>

						<Input name="adress.country" displayName="Country" control={control} />

						<h1 className="text-light-purple mb-2">Bill to</h1>

						<Input name="client.name" displayName="Clint's Name" control={control} />

						<Input name="client.email" displayName="Clint's Email" control={control} />

						<Input
							name="client.street"
							displayName="Street Address"
							control={control}
						/>

						<div className="flex items-center justify-between w-full gap-4">
							<Input name="client.city" displayName="City" control={control} />
							<Input
								name="client.postCode"
								displayName="Post Code"
								control={control}
							/>
						</div>
						<Input name="client.country" displayName="Country" control={control} />
						<Input
							name="client.invoiceDate"
							displayName="Invoice Date"
							control={control}
						/>
						<InputSelect
							name="client.paymentTerm"
							displayName="Payment Terms"
							control={control}
						/>

						<Input
							name="client.description"
							displayName="Project / Description"
							control={control}
						/>

						<h1 className="text-light-purple mb-2">Item List</h1>
						{fields.map((field, index) => {
							return (
								<div className="flex flex-col flex-wrap" key={field.id}>
									<Input
										name={`items.${index}.name`}
										displayName="Item Name"
										control={control}
									/>

									<div className="flex items-center justify-between w-full gap-4">
										<Input
											name={`items.${index}.quantity`}
											displayName="Quantity"
											control={control}
										/>

										<Input
											name={`items.${index}.price`}
											displayName="Price"
											control={control}
										/>

										<Input
											name={`items.${index}.total`}
											displayName="Total"
											control={control}
											readonly={true}
										/>

										<button
											onClick={() => {
												remove(index);
											}}
											disabled={fields.length === 1}
										>
											<Image
												className="mr-4"
												src={garbage}
												alt="garbage icon"
												height={15}
											/>
										</button>
									</div>
									<button
										className="w-full justify-center mb-4 flex items-center bg-background-dark1 rounded-full py-3 text-light-gray font-bold text-sm"
										onClick={() =>
											append({
												name: '',
												quantity: 0,
												price: 0,
												total: 0,
											})
										}
										disabled={fields.length > 1}
									>
										+ Add new item
									</button>
								</div>
							);
						})}
						<div className="flex items-center gap-2 my-4 justify-end">
							<button
								className="mb-4 flex items-center bg-background-dark1 rounded-full px-10 py-3 text-white font-bold text-sm"
								onClick={() => onGoBack()}
							>
								Cancel
							</button>
							<button className="mb-4 flex items-center bg-light-purple rounded-full px-4 py-3 text-white font-bold text-sm">
								Save Changes
							</button>
						</div>
					</form>
				</>
			) : (
				<Skeleton />
			)}
		</div>
	);
}
