'use client';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InvoiceInput from '../InvoiceInput';
import InvoiceSelect from '../InvoiceSelect';
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

export default function InvoiceForm() {
	const [createNewInvoice] = useCreateNewInvoiceMutation({
		fixedCacheKey: 'shared-update-invoices',
	});
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
	} = useForm<invoiceSchemaData>({
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

	const { formType, id } = useAppSelector(state => state.invoiceSelect);

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
						<h1 className="text-light-purple mb-2">Bill From</h1>

						<Controller
							control={control}
							name="items"
							render={({ field: { onChange, onBlur, value, ref } }) => {
								// setValue('items.0.price', value);
								return (
									<input
										onChange={e =>
											onChange(
												setValue('items.0.price', parseInt(e.target.value))
											)
										}
										name="items[0].price"
									/>
								);
							}}
						/>

						<InvoiceInput
							displayName="Street Address"
							name="adress.street"
							errors={errors}
							register={register}
						/>
						<div className="flex items-center justify-between w-full gap-4">
							<InvoiceInput
								displayName="City"
								name="adress.city"
								errors={errors}
								register={register}
							/>

							<InvoiceInput
								displayName="Post Code"
								name="adress.postCode"
								errors={errors}
								register={register}
							/>
						</div>
						<InvoiceInput
							displayName="Country"
							name="adress.country"
							errors={errors}
							register={register}
						/>

						<h1 className="text-light-purple mb-2">Bill to</h1>
						<InvoiceInput
							displayName="Client's Name"
							name="client.name"
							errors={errors}
							register={register}
						/>
						<InvoiceInput
							displayName="Client's Email"
							name="client.email"
							errors={errors}
							register={register}
						/>
						<InvoiceInput
							displayName="Street Address"
							name="client.street"
							errors={errors}
							register={register}
						/>

						<div className="flex items-center justify-between w-full gap-4">
							<InvoiceInput
								displayName="City"
								name="client.city"
								errors={errors}
								register={register}
							/>

							<InvoiceInput
								displayName="Post Code"
								name={'client.postCode'}
								errors={errors}
								register={register}
							/>
						</div>
						<InvoiceInput
							displayName="Country"
							name={'client.country'}
							errors={errors}
							register={register}
						/>

						<InvoiceInput
							displayName="Invoice Date"
							name="client.invoiceDate"
							errors={errors}
							register={register}
						/>

						<InvoiceSelect
							displayName="Payment Terms"
							name="client.paymentTerm"
							errors={errors}
							register={register}
						/>

						<InvoiceInput
							displayName="Project / Description"
							name="client.description"
							errors={errors}
							register={register}
						/>

						<h1 className="text-light-purple mb-2">Item List</h1>
						{fields.map((field, index) => {
							return (
								<div className="flex flex-col flex-wrap" key={field.id}>
									<InvoiceInput
										displayName={`Item Name`}
										name={`items[${index}].name`}
										errors={errors}
										register={register}
									/>

									<Controller
										name={`items.${index}.quantity`}
										control={control}
										defaultValue={field.quantity} // make sure to set up defaultValues
										render={({ field: { onChange } }) => (
											<input
												onChange={e =>
													onChange(
														setValue(
															`items.${index}.quantity`,
															parseInt(e.target.value)
														)
													)
												}
											/>
										)}
									/>

									<div className="flex items-center justify-between w-full gap-4">
										<InvoiceInput
											displayName="Qty."
											name={`items[${index}].quantity`}
											errors={errors}
											register={register}
										/>

										<InvoiceInput
											displayName="Price"
											name={`items[${index}].price`}
											errors={errors}
											register={register}
										/>

										<InvoiceInput
											displayName="Total"
											name={`items[${index}].total`}
											errors={errors}
											register={register}
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
								</div>
							);
						})}
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
						<div className="flex items-center gap-2 my-4 justify-end">
							<button className="mb-4 flex items-center bg-background-dark1 rounded-full px-10 py-3 text-white font-bold text-sm">
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
